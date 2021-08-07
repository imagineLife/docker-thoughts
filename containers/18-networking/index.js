const { readFile, writeFile } = require('fs');
const { join } = require('path');

const dataPath = join(process.env.DATA_PATH || "./data.txt");

function writeTo(d){
  writeFile(dataPath, d.toString(), (err, res) => {
    if(err){
      return;
    }else{
      console.log(`write ${d} successful!`)
    }
  })
}

readFile(dataPath, (err, bufferRes) => {
  if(err){
    writeTo(0)
    return;
  }
  const strRes = bufferRes.toString();
  writeTo(+strRes + 1);
})