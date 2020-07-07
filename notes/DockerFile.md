## DockerFile
- used for building containers
- docker reads it
- docker builds the container from the dockerFile

### Make one
#### make a directory
- mkdir container-v1
- cd container-v1

#### touch Dockerfile
#### Prep the file
... a series of constructions, proceedural
- each line is an instruction

DOCKERFILE!
- get the node-stretch container from dockerHub
```
FROM node:12-stretch
```

- do something when it starts up
```
CMD ["node", "-e", "console.log(\"omg hi lol\")"]
```
- the -e flag says 'immediately run this!'
- this is the same as running, from cmd line,
	- ```node -e console.log("hello!")```


### build the docker container
build the docker container, finding the dockerFile
```docker build .```
...should spit out stats that it is running the container, including container name

### run the container
```docker run -it <container-hash>```