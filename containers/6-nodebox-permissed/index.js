const { createServer} = require('http');

createServer(function(req,res){
  console.log(`req received!`);
  res.end(`Response string`, "utf-8");
})
.listen(3000)
console.log('Http server started')
