## Using a more complicated node server

## Build this into an image with a tag

```bash
docker build -t express-box .
```

## Run the image

```bash
docker run --init --rm --publish 1234:3000 express-box
```

- init
  - tini backwards, allows `^C` from host terminal to kill docker box
- rm
  - auto remove container on exit
- publish
  - expose the _host port_ with the _container_ port (_host:container_)
  - publish can be better than the docker inline `EXPOSE` because the `-p` can be set on RUN

## the USER in the dockerfile
- setting the user to `node`
  - the node image COMES WITH a "node" user
  - all following commpands are run by the named user, here the `NODE` user

## The WORKDIR
- this sets... the "working directory"... for some following commands in the dockerfile
  - RUN
  - CMD
  - ENTRYPOINT
  - COPY
  - ADD
- this `workdir` command can even work with env vars previously stated in the docker file
```bash
ENV DIRPATH=/path
ENV DIRNAME=/childpathhere
WORKDIR $DIRPATH/$DIRNAME
```

## PROBLEMS with this style of container

- MUST run npm i _on the host_
  - what about when i deploy this docker setup somewhere else? will `npm i` work there? Like in CI?
- Node has `native` modules that don't work cross-platform
  - this makes installing modules on the _host_ silly
- **DEPENDS ON NODE_MODS ON THE HOST**

## SOLUTION

- have the node use run _mkdir_ for the dir that will become the _WORKDIR_
  - this will make the _owner_ of the workdir the "node" user
  - this allows npm i to be done by the node user & save the mods to the container
