var ws;
function doConnect(){
	var linkString = "ws://115.159.212.28:8888/testWebsocket";
	var userName = "Jack";
	ws = new WebSocket(linkString);
}
//
ws.onMessage() = function(evt){
	alert(evt.data);
}