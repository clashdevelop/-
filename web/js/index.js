// var scene = new THREE.Scene();
// var renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
// renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMapEnabled = true;

//添加需要绘制球体
// for(var index_Balls = 0;index_Balls < Balls.length;index_Balls++){
// 	Balls[index_Balls].draw(scene);
// }
//添加鼠标的直线
var myMouse = new mouse();
myMouse.draw(scene);

//添加坐标轴
var axes = new THREE.AxisHelper(20);
scene.add(axes);

//添加灯光
var spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(-40, 60, 100);
// spotLight.castShadow = true;
scene.add(spotLight);

// add the output of the renderer to the html element
document.getElementById("WebGL-output").appendChild(renderer.domElement);

var Camera = new camera();
// my_ball = aBall;

function renderScene() {
    if(my_ball == null  || my_ball == undefined || my_ball == '' || Balls.length > 0 ){   
        //引入系统更新方法
        time = systemUpdate(time,receiveTime);//Control/updateControl.js

        // Camera.setLookAt(my_ball.getPosition());
        // Camera.setPosition(my_ball.getPosition());
        
        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
    	renderer.render(scene,Camera.getCamera());
	}else{
		console.log("length < 0");
	}
}
renderScene();
