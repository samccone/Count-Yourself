var net		= require('net');
var id		= (Math.floor(Math.random()*1048577)).toString(16);
var connected = false;
var c	= net.connect(12345);

c.on('close',function(){
	console.log('disconnect');
	connected=false;
});

c.on('connect',function(){
	console.log('connect');
	sendMessage();
	connected=true;
});


function sendMessage(){
	var count = Math.floor(Math.random() * 301);
	connected && c.write(id+"|"+count);
	setTimeout(sendMessage,2000);
}