const { readFile, writeFile } = require('fs');
const { join } = require('path');

const dataPath = join(process.env.DATA_PATH || "./data.txt");

function writeTo(d){
  writeFile(dataPath, d.toString(), (err, res) => {
    if(err){
      console.log('WRITE err')
      console.log(err)
      return;
    }else{
      console.log('write successful!')
    }
  })
}

readFile(dataPath, (err, bufferRes) => {
  if(err){
    console.log('readfile err')
    console.log(err)
    console.error(err);
    writeTo(0)
    return;
  }

  const strRes = bufferRes.toString();
  console.log(`STR RES`)
  console.log(strRes);
  console.log('// - - - - - //')
  
  writeTo(+strRes + 1);
})