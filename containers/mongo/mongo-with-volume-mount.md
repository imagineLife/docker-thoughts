# Run A Mongo Container leveraging data outside the container
## A Problem and a solution
**The Problem**: Running a docker container with mongo, alone, means that the data that the mongo container leverages is _inside the container_. This can be a problem when we want the data to last longer than the container. With docker, when the container gets killed, all contents in the container go with it, so killing the container will kill the data goes with it.   

**A Solution**: Here, spin up a docker container that runs a mongo server where the data is hosted _outside the container_, on the host machine's desktop. For this, we leverage a [Docker Volume Mount](https://docs.docker.com/storage/volumes/).

## Spinning Up a Mongo container
This will
- get a docker container started that runs an instance of mongo
- name the container `mdb` for reference later
- pull, explicitly, the `mongo:bionic` image from the docker bug repo.

This will NOT get the data out of the container - this is perhaps just for reference.  
```bash
	docker run --name mdb -d mongo:bionic
```

**Validate the container is up & running**  
To see the container "running" that we just got started, show a list of all docker containers - 
```bash
	docker container ls 
```
the output should be something like
```bash
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS       NAMES
bd6150948327   mongo:bionic   "docker-entrypoint.s…"   About a minute ago   Up About a minute   27017/tcp   mdb
```

## Spin up a mongo container with data outside the container
I
```bash
	docker run --name mdb -v /my/own/datadir:/data/db -d mongo
```