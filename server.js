var presses = {};
var net		= require('net');
var http = require('http');

var server = net.createServer(function (s) {
	s.setEncoding('utf8');
	s.on('data',processData);
});

function processData(d){
	var parsed = d.split('|');
	var count = parseInt(parseInt(parsed[1],10),10);
	var obj	= presses[parsed[0]];
	if(obj){
		obj.total += count;
		obj.step.push(count);
	} else {
		presses[parsed[0]] = {
			total : count,
			step : [count]
		};
	}
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var response = "<h1>Key Count!</h1>";
  for(p in presses){
  	response += "<p>"+p + " -- " + presses[p].total + "</p>";
  }
  res.end(response);
}).listen(1337, '127.0.0.1');


server.listen(12345, '0.0.0.0');