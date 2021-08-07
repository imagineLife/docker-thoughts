# Run A Mongo Container leveraging data outside the container
## A Problem and a solution
**The Problem**: Running a docker container with mongo, alone, means that the data that the mongo container leverages is _inside the container_. This can be a problem when we want the data to last longer than the container. With docker, when the container gets killed, all contents in the container go with it, so killing the container will kill the data goes with it.   

**A Solution**: Here, spin up a docker container that runs a mongo server where the data is hosted _outside the container_, on the host machine's desktop. For this, we leverage a [Docker Volume Mount](https://docs.docker.com/storage/volumes/).
