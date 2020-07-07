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