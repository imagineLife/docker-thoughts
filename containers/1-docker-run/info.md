## Running a container

- get docker running
- run this from the command line

```bash
docker run --interactive --tty alpine:3.10
```

or...

```bash
docker run -it alpine:3.10
```

### About

- docker
  - leverage the docker cli
- run
  - can run a container, `run` is a docker command
- ## `--interactive`
- `--tty`
  - opens a shell in the container
- `alpine:3.10`
  - a version of alpine declared
  - COULD run `alpine`, but `alpine` will run the `latest` tag of alpine
  - alpine is the name of a container from docker

### Result

- the cli will be 'in' the docker container

### Validate some container deets

#### see info about the os in the container by running

```bash
cat /etc/issue
```

should see

```bash
Welcome to Alpine Linux 3.10
Kernel \r on an \m (\l)
```

#### see all the dirs installed in the os

```bash
ls
```

should see

```
bin    etc    lib    mnt    proc   run    srv    tmp    var
dev    home   media  opt    root   sbin   sys    usr
```

### Run a detatched container

```bash
docker run -it --detach ubuntu:bionic
```

- spits out the hash of the container
- leaves container running in the background

### Enter the terminal of a background-running container

```bash
docker attach <container-name>
docker attach loving_bhaskara
```

### See what containers are running

```bash
docker ps
```

### Leave the container through the cli

```bash
exit
```

### stop a running container

```bash
docker kill <container-name>
```

### name a container

```bash
docker run -it alpine:3.10 --name water
```
