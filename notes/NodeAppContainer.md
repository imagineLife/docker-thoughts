## A Node App Container
### new dir
```
mkdir build-a-node-app
cd build-a-node-app
touch index.js
```

### create a simple node server
```
const http = require('http')
http.createServer((res,res) => {
  console.log('req recieved!')
  res.end('omg hey!!', 'utf-8')
})
.listen(3000)
console.log('server started!')
```

### make a dockerfile that containerized + runs the server
```
touch Dockerfile
```
edit the file
```yaml
# pull the node stretch img
FROM node:12-stretch

# copy the http server file from the files to the container space
COPY index.js index.js
CMD ["node", "index.js"]
```

### build docker container
```
docker build -t this-node-app .
```
.. should see some output about the container!
...why the hashes?! there are valid containers throughout the build process

### run the container
``` 
docker run this-node-app
```

### cant hit ctl+c
docker gives a hack flag that allows ctrl+c to work...
```
docker run --init this-node-app
```
the --init flag runs 'tini', so that when i want to quit the container by typing ctrl+c, tini does it for me!

### allow network traffic from host to container
expose port 3000 to the open world
```
docker run --publish 3000:3000 this-node-app
```
the --publish flag maps internal port to external port!
INTERESTING: he recommends publish flag OVER the expose flag