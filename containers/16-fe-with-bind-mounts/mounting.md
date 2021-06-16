# Mounting a volume

Run the container with mount in the cli

- FIRST
  - build the frontend setup

```
docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx
```

- `mount`
  - instructs docker to leverage an external dir
- `type`
  - instructs docker which type of mount
    - there are binds and volumes
- `source`
  - a full, absolute path, to a directory on the host where docker will leverage
- `target`
  - where the "output" of the mount goes inside the container

## Allows

- storing of data on HOST && serving host data into the container
- the container "acts" as if the host dir is _in the container_

## Suggested to maintain build for prod

- keep even the static code in a container
- maintains the isolated nature of the entire application
