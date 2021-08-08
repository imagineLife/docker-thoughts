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