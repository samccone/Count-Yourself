var tcpServer = require('./tcpServer/server.js');

var webServer = require('./webServer/server.js').start({
	'port': 1337,
	'data': tcpServer.getData,
	'newData' : tcpServer.onNewData
});

tcpServer.start();