## Sharing Data From host to container
**SNOWFLAKES**
- a 'snowflake' is a container that is heavily dependant on other things
- **we want CATTLE**
	- servers that are not named or cared-for
- Sometimes things DONT FIT INTO A CONTAINER (data in a db)
	- MOUNTS help with this...
		- bind-mounts
		- volume-mounts

## Extracting 'state' data outside of the container in 4-ways
- bind mounts
- volumes
- tmpfs
- npipe (named pipes)

### Bind mounts
- potentially useful for dev environments
- files on host that are being exposed to the container
```
docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx
```

### Volume Mounts
- docker manages content that lives on the host machine but accessible inside the container

### start a new project
```
mkdir volume-practice
cd volume-practice 
touch index.js
touch Dockerfile
``` 

### Update index.js
```
const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(process.env.DATA_PATH || "./data.txt");

fs.readFile(dataPath)
  .then(buffer => {
    const data = buffer.toString();
    console.log(data);
    writeTo(+data + 1);
  })
  .catch(e => {
    console.log("file not found, writing '0' to a new file");
    writeTo(0);
  });

const writeTo = data => {
  fs.writeFile(dataPath, data.toString()).catch(console.error);
};
```
- this expects the DATA_PATH var passed through docker to the js file

### make dockerfile
```
FROM node:12-alpine
COPY --chown=node:node . /src
WORKDIR /src
CMD ["node", "index.js"]
```

### build it
 docker build --tag=incrementor .

### run it, giving volume access to the host data dir
```
docker run DATA_PATH=/data/num.txt --mount type=volume,src=incrementor-datatarget=/data incrementor
```
