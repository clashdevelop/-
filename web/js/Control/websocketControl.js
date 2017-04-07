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
}
websocket.onerror = function(){
	sendMessage("Error");
}
websocket.onclose = function(){
	sendMessage("Close");
}
//窗口关闭前调用
// window.onbeforeunload = function(){
// 	websocket.close();
// }