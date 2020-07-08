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

```

