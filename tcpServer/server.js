var net				= require('net');
var presses		= {};
var newDataCB;

var server = net.createServer(function (s) {
	s.setEncoding('utf8');
	s.on('data',processData);
});

function getPresses(){
	return presses;
}

function processData(d){
	var parsed = d.split('|');
	var count = parseInt(parsed[1],10);
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
	newDataCB && newDataCB(presses);
}

function onNewData(cb){
	newDataCB = cb;
}

function startServer(args){
	args = args || {};
	args.port = args.port || 12345;
	args.host = args.host || "0.0.0.0";
	console.log("TCP Server Started on port:"+ args.port);
	server.listen(args.port, args.host);	
}


exports.start = startServer;
exports.getData = getPresses;
exports.onNewData = onNewData;