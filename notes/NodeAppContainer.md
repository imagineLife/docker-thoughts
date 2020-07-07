## A Node App Container
### new dir
```
mkdir build-a-node-app
cd build-a-node-app
touch index.js
```

### edit index.js
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
```
FROM node:12-stretch
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