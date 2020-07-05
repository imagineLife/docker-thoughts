
### Running Docker Images
```docker run```
thats the main command.

Here's a more realistic command...
```
docker run --interactive --tty alpine:3.10 # or, to be shorter: docker run -it alpine:3.10
  ```

Developers might be more interested in RUNNING containers rathe than BUILDING them.
 
 - apline is the flavor of linux being run , sourced from docker-hub
 - COULD run ```docker run alpine```
	 - this would implicitly run alpine:latest
	 - try to be explicit about versions being used
 - ALPINE IS...
	 - tiny linux, has bare-bone necessities for running web-servers

check  cur version
```cat /etc/issue```
...etc/issue is a linux file that prints which version of linux is being run
should return ```Welcome to Alpine...```

### Made to be ephemeral
docker containers are made to be spun up && thrown out

### docker run shortcut
```
docker run -it alpine:3.10
``` 
- puts me interactively inside the container
- docker run alpine 3.10 runs && quits

### run a command after starting a container
```
docker run alpine:3.10 ls
```
- ls of the container (the root of the container)

### order of  commands matters
- docker
- run (the command)
- flags (--t --rm)
- name of container (alpine:3.10)
- command to run (ls, etc)

### how to clear docker images that are running
```
docker image prune
```

### run a container in the bg 
```
docker run -it --detach ubuntu:bionic
```
- detach spits out the hash
- runs container in bg

### attach a bg container
```
docker attach <container-name-here>
```

### kill a container
``` docker kill <container-id OR name>```


### Naming a container
``` docker run -it --name my-container apline:3.10```
- NAMES the container my-container


### NOTE: cant use a container name 2x
- particularly after 'kill'ing a container
- MUST run ```docker rm my-alpine```