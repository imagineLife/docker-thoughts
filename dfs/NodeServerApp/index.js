const hapi = require("@hapi/hapi");

//server config
const serverObj = {
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
	Steps to work with docker...

	1. npm init -y
	2. build the docker container
	  - docker build -t node-hapi-box .
	3. run the project in docker
	  - docker run --init --rm --publish 3000:3000 node-hapi-box

*/