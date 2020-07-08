## Node + Hapi

### An index.js server  file
```
const hapi = require('@hapi/hapi')

async function start(){
  const server = hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 3000
  })

  server.route({
    method: 'GET',
    path: '/',
    handler(){
      return {success: true }
    }
  })

  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true
    }
  })

  await server.start()
  return server;
}

start().catch(e => {
  console.log(e)
  process.exit(1)
})
```
here, hapi builds a server, like express

### install dependencies
- go to terminal
- go to directory 'more-complicated-nodejs-app' or whatever it is called
- run ```npm init -y```
  - should now be package.json next to the index.js above
- run ``` npm install @hapi/hapi hapi-pino ```
- can TEST the node process by running ```node index.js```
  - the server can be reached @ localhost:3000/
  - the terminal should log some details

### add a dockerfile
touch Dockerfile
```
FROM node:12-stretch

USER node

WORKDIR /home/node/code

# copy all from . to .
COPY --chown=node:node . .

CMD ["node", "index.js"]
```


### build the container
```docker build -t noder-server-container```

### run the container && server
```
docker run --init --rm --publish 3000:3000 noder-server-container 
```

## HMM
- above, the node modules have been installed on the HOST computer. This is not optimal, perhaps
  - the npm install has to happen inside the container
  - the dockerfile needs updating...

```
FROM node:12-stretch

USER node

WORKDIR /home/node/code

# copy all from . to .
COPY --chown=node:node . .

# adheres to the package-lock file, ignores some npm i stuff
RUN npm ci

CMD ["node", "index.js"]
```
### ...permission errors!
- this home/code  dir is owned by 'root' user not 'node' user
- dockerfile needs updating

```
FROM node:12-stretch

USER node

#mkdir so that workdir doesnt try to make it as node user with bad permissions
RUN mkdir /home/node/code

WORKDIR /home/node/code

# copy all from . to .
COPY --chown=node:node . .

# adheres to the package-lock file, ignores some npm i stuff
RUN npm ci

CMD ["node", "index.js"]
```

