/*
	定义更新变量 用于 对象获取服务器推送消息
*/
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
//实物
var Balls = [];
Balls = new Array();

//首先传入一个 aBall 做为鼠标和摄像机的测试
var aBall = new ball();
aBall.setRadius(5);
// addNewBall(aBall,1);
// Balls.push(aBall);
//当前玩家对应的小球
var my_ball ;
var new_ball = new ball();
//当前玩家对应的ID号
var my_id;
var allBallJson = {

};
//定义计时器
var time = 0;
//规定每次接收位置消息
var receiveTime = 1;
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
			changeAllBallNextPosition();
		break;
		case "localId":
			//获取本地小球
			my_id = originJson.content;
			//创建小球并添加进Balls
			// var new_ball = new ball();
			// new_ball.setRadius(5);
			// my_ball = new_ball;
			// addNewBall(new_ball,my_id);
			// renderScene();
		break;
	}
}
function changeAllBallNextPosition(){
	//更新每个小球的 nextposition
	if(Array.isArray(allBallJson)){
		//ball的flag清零
		for(var oneBall in Balls){
			Balls[oneBall].flag = 0;
		}
		for(var oneBallJson in allBallJson){
			//获取数据包中ID号对应的小球下标
			allBallJson[oneBallJson].flag = 0;

			for(var oneBall in Balls){
				if(Balls[oneBall].getId() == ""+allBallJson[oneBallJson].id){
					Balls[oneBall].flag = 1;
					allBallJson[oneBallJson].flag = 1;

					Balls[oneBall].setNextPosition(new position(allBallJson[oneBallJson].x,allBallJson[oneBallJson].y,0));
				}
			}
			// getBallById(allBallJson[oneBallJson].id).setNextPosition(new position(allBallJson[oneBallJson].x,allBallJson[oneBallJson].y,0));
		}
		//判断玩家退出事件
		for(var oneBall in Balls){
			var i = oneBall;
			if(Balls[i].flag == 0){
				//玩家退出
				// for(var i = oneBall;i < Balls.length-1;i++){
				// 	Balls[i] = Balls[i+1];
				// }
				// Balls.length -= 1;
				console.log("remove ball " + Balls[i].id);
				scene.remove(Balls[i].core);
			}
		}
		//判断新玩家的加入
		for(var oneBallJson in allBallJson){
			if(allBallJson[oneBallJson].flag == 0){
				console.log("add ball " + allBallJson[oneBallJson].id);
				//加入玩家
				var new_ball = new ball();
				new_ball.setRadius(5);
				// my_ball = new_ball;
				addNewBall(new_ball,allBallJson[oneBallJson].id);
			}
		}
		
	}else{
		if(Balls.length == 0){
			var new_ball = new ball();
			new_ball.setRadius(5);
			// my_ball = new_ball;
			addNewBall(new_ball,allBallJson.id);
			renderScene();
		}else{
			Balls[0].setNextPosition(new position(allBallJson.x,allBallJson.y,0));
		}
	}
	//判断本地小球
	if(my_ball == null  || my_ball == undefined || my_ball == ''){
		for(var oneBall in Balls){
			if(my_id==Balls[oneBall].getId()){
				my_ball=Balls[oneBall];
				renderScene();
			}
		}
	}
	// console.log(JSON.stringify(allBallJson));
}
function getJsonFStr(str){
	var res = str;
	return eval('(' + res + ')');
}
// 添加新球，id为小球ID号
function addNewBall(newball,id){
	newball.setId(id);
	newball.draw(scene);
	Balls.push(newball);
}
function removeFBalls(array,index){
	if(index<=(array.length-1)){ 
		for(var i=index;i<array.length;i++){ 
			array[i]=array[i+1]; 
		} 
	}
	else{ 
		throw new Error('超出最大索引！'); 
	} 
	array.length=array.length-1; 
	return array; 
}
