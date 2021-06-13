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
