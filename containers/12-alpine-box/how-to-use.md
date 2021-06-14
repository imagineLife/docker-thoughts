## Using a more complicated node server

## Build this into an image with a tag

```bash
docker build -t express-box .
```

## Run the image

```bash
docker run --init --rm --publish 1234:3000 express-box
```

**NOTE**  
Publish is _better_ than `EXPOSE` in the dockerfile.  
Publish is port mapping.  
`EXPOSE` only exposes internal port && docker 'magically' sets the external port.

- init
  - tini backwards, allows `^C` from host terminal to kill docker box
- rm
  - auto remove container on exit
- publish
  - expose the _host port_ with the _container_ port (_host:container_)
