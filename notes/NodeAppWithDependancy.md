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

