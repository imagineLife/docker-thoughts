# Docker Networking
## Overview and Use Case
Docker networking is about several containers talking directly with one another.  
A use case could be that a host machine, like your desktop or laptop, has a few docker containers running on it: a container running mongoDB, another container running an http server/REST API, and another container running a server hosting your frontend project in react. On one hand, these containers could use your machine's available ports to "talk to" each other. With docker networking, the container connections are more explicitly described.  

## The Container Name benefit
One docker-specific benefit to using docker networking is that each container can reference other containers by friendly names you give each container during container creation. Without docker networking, IP addresses are needed to connect containers.  
If the db container is named `mongo-box` and the api container is named `api-box`, the two containers can refer to each other not only by IP addresses but by their names, `mongo-box` and `api-box`.  

## Inspecting Default Docker networks
View running networks with 
```bash
docker network ls

# should show something like
NETWORK ID     NAME      DRIVER    SCOPE
d53803487bb3   bridge    bridge    local
db2de287c236   host      host      local
1786993f12c5   none      null      local
```
Docker starts with these networks.  
Docker allows us as devs to connect to the `bridge` network, and connect containers together through this `bridge` network.  
Below, though, a custom network will be created

## Using Custom Networks Is Better
According to [Docker networking docs](https://docs.docker.com/network/bridge/), there are notable differences between user-defined networks and the built-un bridge network:  
- The default bridge network only allows containers to talk using IP addresses
- containers share env vars when shared via the default network, which can get complex to figure out where env vars are declared and which containerized apps are leveraging which env vars
- Explicitly defining container networking orchestration can simplify networking bugs, as all containerscreated ion the same docker instance are all, by default, leveraging the default `bridge` network. Perhaps a container providing some infrequent analytics service against a fellow `mongo-box` container. This `db-analytics` container is running alongside the `mongo-box` container and also the `api-box` container. If a "network blip" happens outside of a docker network, debugging the cause of this could be more complex than if those 3 containers were all on an explicitly defined `backend-web` network.  

## Create a custom network
```bash
# create a new network with a friendly name `backend-web`
docker network create --driver=bridge backend-web

# validate the new network has been created
docker network ls
```
that should return something like
```bash
NETWORK ID     NAME          DRIVER    SCOPE
37fa7105794c   backend-web   bridge    local
d53803487bb3   bridge        bridge    local
db2de287c236   host          host      local
1786993f12c5   none          null      local
(base) Jakes-4:18-networking Jake$ 
```

## Spin up and connect a few container to the network
### The mongod instance
```bash
# do it
docker run -d --network=backend-web -p 27017:27017 --name=mongo-box --rm mongo:4
```
- spin up & start the `mongo:4` container from docker hub
- run it in the bg `-d`
- add it to the network `--network=backend-web`
- expose the default mongodb port to all other containers in the network `-p 27017:27017`
- give it a friendly name `--name=mongo-box`
- remove the container on container shutdown `-rm`

### a mongo cli instance
```bash
# do it
docker run -it --network=backend-web --rm --name=mongo-cli mongo:4 mongo --host mongo-box
```
- spin up & start the `mongo:4` container from docker hub
- run it in interactive mode with a shell `-it`
- add it to the network `--network=backend-web`
- give it a friendly name `--name=mongo-cli`
- remove the container on container shutdown `-rm`
- run the mongo cli && connect to the OTHER mongo container as the mongo host `mongo --host mongo-box`
Inserting a doc into a collection from this container will add a doc to the other `mongo-box` container.  

### An api container
This is not a docker-hub hosted image, rather a custom build container. A brief overview of a simple api container:
- use a few npm modules: `mongodb`, `@hapi/hapi` and `hapi-pino`
- setup a rest api to do a few things:
  - read from a mongo db
  - contain a 2 endpoint rest api:
    - 1 to show how many records are in a `mockdata` collection
    - 1 to add an empty object as a new document to a `mockdata` collection
- Build an appropriate dockerfile for this api 
```yaml
# Dockerfile
FROM node:12-stretch

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["node", "index.js"];
```
Build the container
- call it `api-box`

```yam
docker build --tag api-box
```
Start the container
- serve via port 3000 on the host
- connect the container to the `backend-web` network
- set an env var that point to the mongo container with `MONGO_CONNECTION_STRING=mongodb://mongo-box:27017`

```yaml
docker run -p 3000:3000 --network=backend-web --env MONGO_CONNECTION_STRING=mongodb://mongo-box:27017 api-box
```