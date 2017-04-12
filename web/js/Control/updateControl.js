/*
	
*/
function systemUpdate(time,receiveTime){

	mouse_time++;
	sendMousePosition();
	ballUpdate();
	Camera.setLookAt(my_ball.getPosition());
    Camera.setPosition(my_ball.getPosition());
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
	// if(Array.isArray(allBallJson)){
	// 	for(var oneBallJson in allBallJson){
	// 		//获取数据包中ID号对应的小球下标
	// 		for(var oneBall in Balls){
	// 			if(Balls[oneBall].getId() == ""+allBallJson[oneBallJson].id){
	// 				console.log("get in");
	// 				Balls[oneBall].setNextPosition(new position(allBallJson[oneBallJson].x,allBallJson[oneBallJson].y,0));
	// 			}
	// 		}
	// 		// getBallById(allBallJson[oneBallJson].id).setNextPosition(new position(allBallJson[oneBallJson].x,allBallJson[oneBallJson].y,0));
	// 	}
	// }else{
	// 	Balls[0].setNextPosition(new position(allBallJson.x,allBallJson.y,0));
	// }
	// console.log( JSON.stringify(allBallJson));
	//调用更新方法
	for(var i = 0;i < Balls.length;i++){
		Balls[i].doUpdate();
	}
}
function getBallById(id){
	var resBall ;
	for(var oneBall in Balls){
		if(Balls[oneBall].getId() == id){
			resBall = Balls[oneBall];
		}
	}
	return resBall;
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
	//websocket.send(JSON.stringify(sendMessage));
}
