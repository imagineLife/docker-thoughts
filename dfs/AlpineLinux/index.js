const hapi = require("@hapi/hapi");

//server config
const serverObj = {
	// cannot use localhost here
	// breaking infinite call loop if-so
  host: "0.0.0.0",
  port: process.env.PORT || 3321
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
  NOTICING layer advantages
  1. build the app
    docker build -t layered-node-app .
  2. SEE all steps succeed (9/9) in terminal output
  3. CHANGE something in this index.js (the port)
  4. re-run the build command
    docker build -t layered-node-app .
  5.SEE steps 1-through-6 SKIP and note...
    '---> Using cache'
  ...
  THIS is leveraging Cached layers


  CONCERNS:
  - Security patches...
    what if when a npm comes up with a new version?
    the cache won't re-run npm i :(

*/