const { server } = require('@hapi/hapi');
const HOST_STR = "0.0.0.0";
const DEFAULT_PORT = 3000;

async function startServer(){
  const s = server({
    host: HOST_STR,
    port: process.env.PORT || DEFAULT_PORT
  })

  s.route({
    method: "GET",
    path: "/",
    handler(){
      return { success: true }
    }
  })
  await s.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true
    }
  })

  await s.start();
  return s;
}

startServer().catch(e => {
  console.log(e);
  process.exit(1)
  
})