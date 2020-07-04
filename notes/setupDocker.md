## Docker Setup
### Check Out [Docker Hub](https://hub.docker.com/search?q=&type=image)
- an 'npm' of docker pre-built containers
	- mongo (downloaded 10M+ times!!)
	- mongo-express...

### show docker containers running
```docker ps```

### pull a container from docker hub
```docker pull mongo:3```


## Docker "Image" without Docker
... an image is a pre-made container
- dumps out 'state' of a container, stores it in a .tar file

(from within a docker container, need ubuntu)
### Start docker container
```docker run -ti -v /var/run/docker.sock:/var/run/docker.sock --privileged --rm --name docker-host docker:18.06.1-ce```
- connects to the docker that is running on docker desktop
### see what os is running
```cat /etc/issue```
- shows ```Welcom to Alpine Linux 3.8```....etc

### show the container running
```docker ps```


### download docker-container from Docker hub
### chroot into env + unshare it
### add it to cGroups