const http = require('http');

http.createServer((req, res) => {
	console.log('Server Request Received!');
	res.end('res end!!' 'utf-8');
}).listen(3000);
console.log('server started!!');