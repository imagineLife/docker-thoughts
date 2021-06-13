## Run the node container

- list of docker node container images [here](https://hub.docker.com/_/node)

```bash
docker run -it node:14.17.0-stretch
```

- stretch ties it to a specific version of.... debian?
-

### See Details about a container

```bash
docker inspect <container-name>
```

- outputs info about the container in the cli

### MORE

- run in background, 'detached', gets the `d` flag
  `docker run -dit jturpin/hollywood hollywood`
- kill a container is `docker kill <container-name>`
- kill all running container `docker kill $(docker ps -q)`
- docker RUN starts a new container
- docker exec starts a process on a running container
- see whats running in a container with `docker exec <container-name> ps aux`
- go into a container in the cli with `docker exec -it <container-name> bash`
- see changes of docker image with `docker history <docker-image>`
  - ex. `docker history node:14-stretch`
- `docker container prune` - removes all containers
- `docker image prune` - removes all images
- `docker search <some-name-here>` finds docker images from the image repo

### Run a mongo image in the gb

`docker run -dit mongo`

### see all processes in a container

`docker top <container-name>`
