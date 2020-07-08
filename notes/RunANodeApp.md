## Running a node app
**DONT RUN AS THE ROOT USER OF THE CONTAINER**
principle of least-power

### dockerfile
```
FROM node:12-stretch

USER node

COPY --chown=node:node index.js index.js

CMD ["node", "index.js"]
```

NOTE:
- the creators of this container CREATED a user called node, in a usergroup called node
- with the user as node, the container is run as that user
- if the USER row was BELOW the COPY command, the copy command would fail
- --chown=node:node changes who OWNS the index file

### index.js
```
const http = require('http')
http.createServer((req, res) => {
  console.log('request received!')
  res.end('omg...')
})
,listen(3000)
console.log('...server started')
```
### build the container
```
docker build -t my-node-app
```

### run the container, see whoIam
```
docker run --init --rm --publish 3000:3000 my-node-app whoami
```
... should print ```node``` as the node user is the user being used

