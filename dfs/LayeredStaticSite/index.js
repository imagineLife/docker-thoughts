const hapi = require("@hapi/hapi");

//server config
const serverObj = {
	// cannot use localhost here
	// breaking infinite call loop if-so
  host: "0.0.0.0",
  port: process.env.PORT || 3000
}

const rootPathHandlerObj = {
  method: "GET",
  path: "/",
  handler() {
    return { success: true };
  }
}

// for registering hapi-pino
const hapiPinoObj = {
  plugin: require("hapi-pino"),
  options: {
    prettyPrint: true
  }
}

async function start() {
  const server = hapi.server(serverObj);

  server.route(rootPathHandlerObj);

  await server.register(hapiPinoObj);

  await server.start();

  return server;
}

start().catch(err => {
  console.log(err);
  process.exit(1);
});


/*
  Create-React-App
  build the app
  copy the files into nGinX container
  nGinX will serve the static assets for us
*/