var websocket;
//新接受消息

function doConnect(){
	var linkString = "ws://localhost:8080/Clash/clash";
	websocket = new WebSocket(linkString);
}
doConnect();
websocket.onopen = function(){
	console.log("Success");
}
websocket.onmessage = function(event){
	messageHandle(event.data);
	// console.log(event.data);
}
websocket.onerror = function(){
	sendMessage("Error");
}
websocket.onclose = function(){
	sendMessage("Close");
}