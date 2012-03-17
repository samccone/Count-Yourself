var express = require('express');
var webServer = express.createServer();
var io			= require('socket.io').listen(webServer);
var data;
var connections = {};

webServer.configure(function(){
	webServer.set("view engine","jade");
	webServer.set('views', __dirname + '/views');
	webServer.set('views');
});

webServer.get( '/', function( req, res ){
	res.render('home');
});

io.on('connection',addConnection);


function addConnection(s){
	connections[s.id] = s;
	s.on('disconnect',function(s){
		delete connections[s.id];
	});
}

function sendDataUpdates(data){
	console.log("new data");
	for(c in connections){
		connections[c].emit('message',data);
	}
}
function startServer(args){
		data = args.data;
		console.log("web server started on port: "+ args.port);
		webServer.listen(args.port);
		args.newData(sendDataUpdates);
}


exports.start = startServer;