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
docker run --init --rm --publish 3000:1234 express-box
```

- init
  - tini backwards, allows `^C` from host terminal to kill docker box
- rm
  - auto remove container on exit
- publish
  - expose the _host port_ with the _container_ port (_host:container_)
