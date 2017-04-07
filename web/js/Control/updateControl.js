/*
	
*/
function systemUpdate(time,receiveTime){

	mouse_time++;
	sendMousePosition();
	ballUpdate();
    //及时更改鼠标中心，将小球的位置传入
    myMouse.doUpdate(my_ball.position);

    return time>=receiveTime?0:++time;
}

/*
	小球更新控制方法
	使用 allBallJson
*/
function ballUpdate(){
	//更新每个小球的 nextposition
	if(Array.isArray(allBallJson)){
		for(var oneBall in allBallJson){
			console.log(allBallJson[oneBall]);
		}
		//当前版本：如果为多人，只更新aBall
		Balls[0].setNextPosition(new position(allBallJson[0].x,allBallJson[0].y,0));
	}else{
		console.log(allBallJson);
		Balls[0].setNextPosition(new position(allBallJson.x,allBallJson.y,0));

	}
	// console.log(allBallJson);
	//调用更新方法
	for(var i = 0;i < Balls.length;i++){
		Balls[i].doUpdate();
	}
}
function getIndexById(id){
	for(var index in Balls){
		if(Balls[index].getId() == 0){

		}
	}
}
//鼠标更新事件
document.onmousemove = mouseMove;
function mousePosition(ev){
	if(ev.pageX || ev.pageY){
		return {pos_x:ev.pageX, pos_y:ev.pageY};
	}
	return {
		pos_x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		pos_y:ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}
function mouseMove(ev) {
	ev = ev || window.event;
	var mousePos = mousePosition(ev);
	//获得中心点
	x = mousePos.pos_x - document.body.clientWidth / 2;
	y = mousePos.pos_y - document.body.clientHeight / 2;

	// var mouseJson = {
	// 	'x':x,
	// 	'y':-y
	// }
	// var sendMessage = {
	// 	'type':'mouse',
	// 	'content':mouseJson
	// }
	// if(mouse_time >= 10){
	// 	// websocket.send(JSON.stringify(sendMessage));
	// 	mouse_time = 0;
	// }

	// websocket.send(JSON.stringify(sendMessage));

	// console.log(JSON.stringify(sendMessage));
}
function sendMousePosition(){
	var mouseJson = {
		'x':x,
		'y':-y
	}
	var sendMessage = {
		'type':'mouse',
		'content':mouseJson
	}
	if(mouse_time >= 5){
		websocket.send(JSON.stringify(sendMessage));
		mouse_time = 0;
	}
	// websocket.send(JSON.stringify(sendMessage));
}