var presses = {};
var net		= require('net');
var http = require('http');

var server = net.createServer(function (s) {
	s.setEncoding('utf8');
	s.on('data',processData);
});

function processData(d){
	var parsed = d.split('|');
	if(presses[parsed[0]]){
		presses[parsed[0]] += parseInt(parsed[1],10);
	} else {
		presses[parsed[0]] = parseInt(parsed[1],10);
	}
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var response = "<h1>Key Count!</h1>";
  for(p in presses){
  	response += "<p>"+p + " -- " + presses[p] + "</p>";
  }
  res.end(response);
}).listen(1337, '127.0.0.1');


server.listen(12345, '0.0.0.0');