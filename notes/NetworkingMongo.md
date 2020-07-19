## Networking, Mongo Example

```
docker network ls
```
probably see...
- bridge
- host
- none

### Connecting to networks
Docker allows connection to the 'default' bridge network (_...called bridge_), allowing 2 containers to talk to each other

### Creating my own network
```
docker network create --driver=bridge app-net
```
see networks
```
docker network ls
```
NOW,
a new network, app-net, can be used to let containers talk to each other.

### Connect a mongodb server to the app-net network
```
docker run -d --network=app-net -p 27017:27017 --name=mongo-box --rm mongo:3
```

### see container running
```
docker ps
```
... should show the container running

### start other container, mongo child
```
docker run -it --network=app-net --rm mongo:3 mongo --host mongo-box
```

Here, we see 'no mystery' of docker networking.