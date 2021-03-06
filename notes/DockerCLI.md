
## Docker CLI

### A PARTY TRICK!
run
 ```
 docker pull jturpin/hollywood
 ```
then run 
```
docker run -it jturpin/hollywood hollywood
```

### docker inspect
```docker inspect node:12-stretch```
spits out metadata...
- hash
- tags
- env vars
- entrypoint

### docker pause
```docker run -dit jturpin/hollywood hollywood```

```docker pause <container-id>```
'pauses' the container...
- freezes the process

```docker unpause <container-id>```

### run vs exec
- run starts a new container
- exec runs something on an existing container
- ```docker exec <container-name> bash```
- bash of an existing container

### connect to a container using exec
```
docker exec -it <container-name> bash
```

### history
```docker history node:12-stretch```
- see changes in container/image history

### kill all containers
```docker kill $(docker ps -q)```

### docker info
```
docker info
```
- dumps a bunch of info about the HOST machine running docker...
	- # of containers running
	- osType
	- ...more

### docker run -dit mongo
### docker top <container-id>
- use top to see all process running in a container

### docker rm <container-hash>
removes a container

### docker rmi
removes an IMAGE

### docker container prune
removes all stopped container


### docker restart <container-name>
restarts the container
... some containers don't notice 'restart' signals, like node

### search docker hub for a python container
```
docker search python
```
searches dockerHub for containers matching the string