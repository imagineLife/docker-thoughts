const httpServer = require('express')()
const apiID = process.env.API_ID;

// Register endpoint listeners
httpServer.get('/', (req,res) => res.send(`API ID ${apiID} says hey`));
httpServer.get('/api1', (req,res) => res.send(`API ID ${apiID} api1`));
httpServer.get('/api2', (req,res) => res.send(`API ID ${apiID} api2`));
httpServer.get('/admin', (req,res) => res.send(`API ID ${apiID} secret admin api`));

httpServer.listen(apiID, () => console.log(`http server id ${apiID} listening on ${apiID}`))