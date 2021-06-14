## Using a more complicated node server

On the host initialize the dir that includes the dockerfile as an npm repo

```
npm init -y
```

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

## PROBLEMS with this style of container

- MUST run npm i _on the host_
  - what about when i deploy this docker setup somewhere else? will `npm i` work there? Like in CI?
- Node has `native` modules that don't work cross-platform
  - this makes installing modules on the _host_ silly
- **DEPENDS ON NODE_MODS ON THE HOST**

## SOLUTION

-
