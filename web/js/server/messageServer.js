/*
	定义更新变量 用于 对象获取服务器推送消息
*/
//实物
var Balls = [];
Balls = new Array();
//首先传入一个 aBall 做为鼠标和摄像机的测试
var aBall = new ball();
aBall.setRadius(5);
Balls.push(aBall);
//当前玩家对应的小球
var my_ball ;
//当前玩家对应的ID号
var my_id;
var allBallJson = {

};
//鼠标位置
var x = 0;
var y = 0;
//websocket
var websocket;
//mouse control time
var mouse_time = 0;
function messageHandle(data){
	var originJson = eval('(' + data + ')');
	switch(originJson.type){
		case "allBall":
			allBallJson = originJson.content;
		break;
		case "join":
			//获取本地小球
			my_id = originJson.id;
		break;
	}
}
function getJsonFStr(str){
	var res = str;
	// console.log(res[0].id);
	return eval('(' + res + ')');
}