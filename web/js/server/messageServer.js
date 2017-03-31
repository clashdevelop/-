/*
	定义更新变量 用于 对象获取服务器推送消息
*/
//实物
var Balls = [];
Balls = new Array();
//首先传入一个 aBall 做为鼠标和摄像机的测试
var aBall = new ball();
Balls.push(aBall);
Balls.push(new ball());

var allBallJson = {

};

function messageHandle(data){
	var originJson = eval('(' + data + ')');
	switch(originJson.type){
		case "allBall":
			allBallJson = originJson.content;
		break;
	}
}
function getJsonFStr(str){
	var res = str;
	// console.log(res[0].id);
	return eval('(' + res + ')');
}