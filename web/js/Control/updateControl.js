/*
	系统更新方法：
		规定计时器	i = 0
		规定时间内对服务器内容进行位置等请求
		请求成功后，规定时间内对小球的位置进行移动

		规定时间为	i = 100?
*/
function systemUpdate(time,topTime){
	if(time >= topTime){
		var radox = Math.random() * 0.3;
		var radoy = Math.random() * 0.3;
		//小球运动,参数为目标位置和规定时间
		var ballPosi = aBall.position;
		ballPosi.x += radox;
		ballPosi.y += radox;
		aBall.doUpdate(new position(ballPosi.x,ballPosi.y,0),time,topTime);
	}
    //及时更改鼠标中心，将小球的位置传入
    myMouse.doUpdate(aBall.position);

    return time>=topTime?0:++time;
}