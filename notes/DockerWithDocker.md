
### Running Docker Images
docker run.
thats the main command.

Here's a more realistic command...
```
docker run --interactive --tty alpine:3.10 # or, to be shorter: docker run -it alpine:3.10
  ```
 
 - apline is the flavor of linus being run , sourced from docker-hub
 - COULD run docker run alpine
	 - this would implicitly run :latest
	 - try to be explicit about versions being used
 - ALPINE IS...
	 - tiny linux, has bare-bone necessities for running web-servers

check cur version
```cat /etc/issue```
should return ```Welcome to Alpine...```

### docker run shortcut
```
docker run -it
``` 
- puts me interactively inside the container

### run a command after starting a container
```
docker run alpine:3.10 ls
```
- shows the ls of the container (the root of the container)

### order of  commands matters
- docker
- run (the command)
- flags (--t --rm)
- name of container (alpine:3.10)
- command to run (ls)
- 