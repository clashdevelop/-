var websocket;
function doConnect(){
	var linkString = "ws://127.0.0.1:8080/Clash/clash";
	websocket = new WebSocket(linkString);
}
doConnect();
websocket.onopen = function(){
	console.log("Success");
}
websocket.onmessage = function(event){
	//sendMessage(event.data);
	console.log(event.data);
}
websocket.onerror = function(){
	sendMessage("Error");
}
websocket.onclose = function(){
	sendMessage("Close");
}