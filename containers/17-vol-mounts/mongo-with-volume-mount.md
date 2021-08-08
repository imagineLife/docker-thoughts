# Run A Mongo Container leveraging data outside the container
## A Problem
Running a docker container with mongo, alone, means that the data that the mongo container leverages is _inside the container_. This can be a problem when we want the data to last longer than the container. With docker, when the container gets killed, all contents in the container go with it, so killing the container will kill the data goes with it.   

### Spinning Up a Mongo container
This will
- get a docker container started that runs an instance of mongo
- name the container `mdb` for reference later
- pull, explicitly, the `mongo:bionic` image from the docker bug repo.

This will NOT get the data out of the container - this is perhaps just for reference.  
```bash
	docker run --name mdb -d mongo:bionic
```

### Validate the container
To see the container "running" that we just got started, show a list of all docker containers - 
```bash
	docker container ls 
```
the output should be something like
```bash
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS       NAMES
bd6150948327   mongo:bionic   "docker-entrypoint.s…"   About a minute ago   Up About a minute   27017/tcp   mdb
```

### Add some data and watch it disappear
Here, add a doc to a new collection in a new db. 
```bash
# enter a shell in the container
docker exec -it mdb bash

# start a mongo cli instance in the container
mongo

# create a db
use water

# add a doc to a new collection in the db
db.melon.insertOne({juice: 'box'})

# see the doc
db.melon.find()

# should return a cli js object version of the doc
```
Now, kill & restart the container
```bash
# exit out of the mongo cli
exit

# exit out of the container cli
exit

# stop & remove the container
docker container stop mdb
docker container rm mdb
```
Now, re-introduce and restart the container. Also, see if the piece of data that was just added is still present, only to find it is missing.  

```bash
# start the container
docker run --name mdb -d mongo:bionic

# enter a shell in the container
docker exec -it mdb bash

# start a mongo cli instance in the container
mongo

show dbs
```
after the `show dbs` command, we could be expecting to see the `water` db listed.  
The `water` db is gone.  
The data, alongside all other contents of the container, are gone when the container is removed.  

## A Solution
Here, spin up a docker container that runs a mongo server where the data is hosted _outside the container_, on the host machine's desktop. For this, we leverage a [Docker Volume Mount](https://docs.docker.com/storage/volumes/).

### Stop and remove the previous container
First, stop & remove the previous container:
```bash
	docker container stop mdb
	docker container rm mdb
```
### Make the host data directory
Next, create a directory that will hold the mongo data on the host machine. Here, a directory called `mongo-data` is created.  
```bash
sudo mkdir mongo-data
```

### Run a container with a volume mount
Next, use the `-v` flag and value to "point" the internal data directory to an external directory.  
As a note, the default data directory that mongo "looks for" is `/data/db`.  
Here, the container will "know" to look for a different file in place of the container's internal `/data/db`. The syntax that gets added to the `docker run` command for "mapping" the internal directory of the container to the host machine is `-v <host-machine-path>:<container-path>`. In this case, the new command will look like `-v ${PWD}/mongo-data:/data/db`.  

```bash
	docker run --name mdb -v ${PWD}/mongo-data:/data/db -d mongo
```

### Add some data and watch it persist 
Here, add a doc to a new collection in a new db. 
```bash
# enter a shell in the container
docker exec -it mdb bash

# start a mongo cli instance in the container
mongo

# create a db
use water

# add a doc to a new collection in the db
db.melon.insertOne({juice: 'box'})

# see the doc
db.melon.find()

# should return a cli js object version of the doc
```
Now, kill & restart the container
```bash
# exit out of the mongo cli
exit

# exit out of the container cli
exit

# stop & remove the container
docker container stop mdb
docker container rm mdb
```
Now, re-introduce and restart the container.  
Validate that the data persists after a killed & reintroduced container. 

```bash
# start the container
docker run --name mdb -v ${PWD}/mongo-data:/data/db -d mongo

# enter a shell in the container
docker exec -it mdb bash

# start a mongo cli instance in the container
mongo

show dbs
```