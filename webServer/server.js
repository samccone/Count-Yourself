var express = require('express');
var webServer = express.createServer();
var data;

webServer.configure(function(){
	webServer.set("view engine","jade");
	webServer.set('views', __dirname + '/views');
	webServer.set('views');
});

webServer.get( '/', function( req, res ){
	res.send(JSON.stringify(data()));
});

function startServer(args){
		data = args.data;
		console.log("web server started on port: "+ args.port);
		webServer.listen(args.port);
}


exports.start = startServer;