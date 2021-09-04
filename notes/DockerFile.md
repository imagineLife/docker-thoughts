## DockerFile
- used for building containers
- docker reads it
- docker builds the container from the dockerFile

- Each line is an instruction, a part of the file's "proceedure"
### Make one
make a directory
```bash 
mkdir container-v1
cd container-v1
```

make the Dockerfile
```bash 
touch Dockerfile
```
#### Prep the file
the dockerfile represents a series of constructions that the os runs. Each line or "section" in the dockerfile is an instruction

```bash
# get the node-stretch container from dockerHub
FROM node:12-stretch

# do something when it starts up
# give it a command to run with **CMD** and an arr of comman args
# `node -e console.log("hey now")` would convert to 
# `["node","-e","console.log(\"hey now\")"]`

CMD ["node", "-e", "console.log(\"omg hi lol\")"]
```

without the comments, the same dockerfile can look like
```bash
FROM node:12-stretch
CMD ["node", "-e", "console.log(\"omg hi lol\")"]
```


### build the docker container
build the docker container, finding the dockerFile
```bash
docker build .
# ...should spit out stats that it is running the container, including container name


### run the container
docker run -it <container-hash>
```

the container can also build using a friendly name, a tag

```docker build --tag friendly-name-here .```

just tagged the container as friendly-name-here!
