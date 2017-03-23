/*
	系统更新方法：
		规定计时器	i = 0
		规定时间内对服务器内容进行位置等请求
		请求成功后，规定时间内对小球的位置进行移动

		规定时间为	i = 100?
*/
function systemUpdate(time,receiveTime){
	var newPosi = new position(0,0,0);
	if(time >= receiveTime){
		//通过网络获取position
		
	}
	//小球运动,参数为目标位置和规定时间
	var perLength = 0.02;
	var radox = Math.random() * perLength;
	var radoy = Math.random() * perLength;
	var ballPosi = aBall.position;
	ballPosi.x += perLength;
	ballPosi.y += perLength;
	aBall.doUpdate(new position(ballPosi.x,ballPosi.y,0));
    //及时更改鼠标中心，将小球的位置传入
    myMouse.doUpdate(aBall.position);

    return time>=receiveTime?0:++time;
}