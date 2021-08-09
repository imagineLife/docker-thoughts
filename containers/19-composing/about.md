# Orchestrating Containers with Composition
Docker compose offers tooling to spin up & tear down many containers while saving & reusing multi-container config.  
## Use Cases
**Not Often Prod**  
Most prod servers have many hosts running containers. In prod, we don't always want many services tied to the same host.  
**CI-CD**  
Spin up & down some temporarily needed containers. Run a bunch of integration tests.  


## Building a Docker Compose file
Docker Compose uses yaml.  
```bash
touch docker-compose.yml
```  
Build the file: 
- use docker compose version 3
- setup a bunch of "service", the containers it is going to spin up
  - an `api-box` container
    - the dockerfile will be located in the root of the same dir where the docker-compose dir is : `build: .`
    - map port 3000 on the container to 3000 on the host: `ports: - "3000:3000"`
    - mount... 
      - a directory to the compose docker instance where the code in the container exists at `home/node/code` and the mount location on the 'host' docker compose instance will be the root: `.:/home/node/code`
      - instruct the compose instance to skip the node_mods from  the api-box: `/home/node/code/node_modules`
    - instruct the docker compose host to link this api-box to the mongo-box instance: `links:  \n - 'mongo-box'`
    - pass an env var to the api-box: `environment: \n MONGO_CONNECTION_STRING: mongodb://mongo-box:27017`
  - a `mongo-box` container
    - 