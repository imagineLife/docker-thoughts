# Docker Networking
## Overview and Use Case
Docker networking is about several containers talking directly with one another.  
A use case could be that a host machine, like your desktop or laptop, has a few docker containers running on it: a container running mongoDB, another container running an http server/REST API, and another container running a server hosting your frontend project in react. On one hand, these containers could use your machine's available ports to "talk to" each other. With docker networking, the container connections are more explicitly described.  

## The Container Name benefit
One docker-specific benefit to using docker networking is that each container can reference other containers by friendly names you give each container during container creation. Without docker networking, IP addresses are needed to connect containers.  
If the db container is named `mongo-box` and the api container is named `api-box`, the two containers can refer to each other not only by IP addresses but by their names, `mongo-box` and `api-box`.  


View running networks with 
```bash
docker network ls

# should show something like
NETWORK ID     NAME      DRIVER    SCOPE
d53803487bb3   bridge    bridge    local
db2de287c236   host      host      local
1786993f12c5   none      null      local
```
