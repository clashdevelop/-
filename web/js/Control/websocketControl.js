var ws;
var linkString = "ws://115.159.212.28:8888/";
ws = new WebSocket(linkString,"123");

ws.onmessage() = function(evt){
	console.log(evt.data);
}