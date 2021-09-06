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