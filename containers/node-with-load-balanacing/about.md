# 3 replica apis one load balancers
The "world" will access the load-balancer.  
The "world" will access haproxy.  
HAProxy will "balance" the incoming request "load" to 3 instances of the exact same api.  

## Build the api
the api can be built into docker image.  
cd into this directory where the `Dockerfile` lives.  

```bash
docker build -t tiny-api .
```

## Brief overview of HAProxy config
The `haproxy.cfg` file contains the ports for each instance of the api:
- the `s1` is the friendly name that haproxy gives to each api server instance
- the `api1` is a name that we give to each container api instance
- the `11111` is the port assigned to each container api instance

## Setup and run Docker Compose
spins up the containers listed in the file.  
Each service "becomes" a hostname / container that is defined in the compose file
The http api `image` is the same named image that was built when building the api image. Above, the image was named `tiny-api`.  
```bash
docker-compose up
```