const e = require('express');
const app = e();
const PORT = process.env.port || 3000;

function rootHandler(req,res){
  res.end('test');
}

app.get('/',rootHandler);
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))