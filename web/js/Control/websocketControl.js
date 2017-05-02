function doConnect(){
	var linkString = "ws://localhost:8080/Clash/clash";
	websocket = new WebSocket(linkString);
	console.log("connect success!");

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
}