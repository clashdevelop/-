var ws;
function doConnect(){
	var linkString = "ws://127.0.0.1:8888/testWebsocket";
	var userName = "Jack";
	ws = new WebSocket(linkString,userName);
}