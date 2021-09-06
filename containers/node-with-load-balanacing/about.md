# 3 replica apis one load balancers
The "world" will access the load-balancer.  
The "world" will access haproxy.  
HAProxy will "balance" the incoming request "load" to 3 instances of the exact same api.  
