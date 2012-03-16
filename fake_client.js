var net		= require('net');
var id		= (Math.floor(Math.random()*1048577)).toString(16);
var c	= net.connect(12345,function(){
	sendMessage();
	console.log("connected");
});


function sendMessage(){
	var count = Math.floor(Math.random() * 301);
	c.write(id+"|"+count);
	setTimeout(sendMessage,5000);
}