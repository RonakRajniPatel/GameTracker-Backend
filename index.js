console.log("node server up");

var http = require('http');

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Node index.js server response message to client application');
  res.end();
}).listen(8080);