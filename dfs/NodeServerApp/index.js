const http = require('http');

http.createServer((req, res) => {
	console.log('Server Request Received!');
	res.end('res end!!', 'utf-8');
}).listen(3000);
console.log('server started!!');

/*
	Building with sibling docker-file

	docker build -t node-app .

	should return...

	Sending build context to Docker daemon  3.072kB
	Step 1/3 : FROM node:12-stretch
	 ---> 1fa6026dd8bb
	Step 2/3 : COPY index.js index.js
	 ---> 724b551c7cef
	Step 3/3 : CMD ["node", "index.js"]
	 ---> Running in 7624c2fab0c1
	Removing intermediate container 7624c2fab0c1
	 ---> 041bdc1a7cc5
	Successfully built 041bdc1a7cc5
	Successfully tagged node-app:latest


	RUNNING
	docker run --init  --rm --publish 3000:3000 node-app
	
	notes: 
		--init lets 'tini' allow command+c to close the service

*/
