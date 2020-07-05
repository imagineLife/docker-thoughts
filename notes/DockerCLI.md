## Docker CLI

### A PARTY TRICK!
run
 ```
 docker pull jturpin/hollywood
 ```
then run 
```
docker run -it jturpin/hollywood hollywood
```

### docker inspect
```docker inspect node:12-stretch```
spits out metadata...
- hash
- tags
- env vars
- entrypoint

### docker pause
```docker run -dit jturpin/hollywood hollywood```

```docker pause <container-id>```
'pauses' the container...
- freezes the process

```docker unpause <container-id>```

