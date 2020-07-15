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
  LAYERING
  multiple containers
  "What do i NOT need in production?!"
  ... npm (as a trivial example, not really a real-life best-practice perhaps)
  
  BUILD IT using 
  docker build -t layered-container .

  RUN IT
  docker run --init --rm -p 3000:3000 -it layered-container

*/