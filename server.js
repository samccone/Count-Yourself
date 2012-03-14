var presses = {};
var net		= require('net');
var http = require('http');

var server = net.createServer(function (s) {
	s.setEncoding('utf8');
	s.on('data',function(d){
		if(presses[d]){
			presses[d]+=1;
		} else {
			presses[d]=1;
		}
	});

});


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var response = "<h1>Key Count!</h1>";
  for(p in presses){
  	response += "<p>"+p + " -- " + presses[p] + "</p>";
  }
  res.end(response);
}).listen(1337, '127.0.0.1');


server.listen(12345, '0.0.0.0');