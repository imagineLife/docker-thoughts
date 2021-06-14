const e = require('express');
const app = e();

function rootHandler(req,res){
  res.end('test');
}

app.get('/',rootHandler);