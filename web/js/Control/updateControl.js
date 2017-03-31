/*
	
*/
function systemUpdate(time,receiveTime){

	//小球运动,参数为目标位置和规定时间
	// var perLength = 0.02;
	// var radox = Math.random() * perLength;
	// var radoy = Math.random() * perLength;
	// var ballPosi = aBall.position;
	// ballPosi.x += perLength;
	// ballPosi.y += perLength;
	//测试用小球更新
	// aBall.doUpdate();
	ballUpdate();
    //及时更改鼠标中心，将小球的位置传入
    myMouse.doUpdate(aBall.position);

    return time>=receiveTime?0:++time;
}
//小球更新控制方法
//使用 allBallJson
function ballUpdate(){
	//更新每个小球的 nextposition
	if(Array.isArray(allBallJson)){
		for(var oneBall in allBallJson){
			// console.log(allBallJson[oneBall]);

		}
	}else{
		// console.log(allBallJson.id);
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