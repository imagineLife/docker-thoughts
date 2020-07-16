const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(process.env.DATA_PATH || "./data.txt");

const writeTo = data => {
  fs.writeFile(dataPath, data.toString()).catch(console.error);
};

const handleReadFile = buffer => {
  const data = buffer.toString();
  console.log(data);
  writeTo(+data + 1);
}

const handleE = e => {
  console.log("file not found, writing '0' to a new file");
  writeTo(0);
}

fs.readFile(dataPath)
  .then(handleReadFile)
  .catch(handleE);