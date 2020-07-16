// https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_promises_api
const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(process.env.DATA_PATH || "./data.txt");

const writeTo = data => {
  fs.writeFile(DATA_PATH, data.toString()).catch(console.error);
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

fs.readFile(DATA_PATH)
  .then(handleReadFile)
  .catch(handleE);