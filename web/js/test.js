var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
/*添加物体*/
//添加球体
var aBall = new ball();
aBall.draw(scene);
//添加鼠标的直线
var myMouse = new mouse();
// myMouse.initPosition();
myMouse.draw(scene);
//添加坐标轴
var axes = new THREE.AxisHelper(20);
scene.add(axes);
//添加参考中心
/*var center = new ball();
center.setPosition(new position(0,0,0));
center.setRadius(2);
center.draw(scene);*/
//添加灯光
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(30, 30, 40);
spotLight.castShadow = true;
scene.add(spotLight);

// add the output of the renderer to the html element
document.getElementById("WebGL-output").appendChild(renderer.domElement);
var Camera = new camera();
Camera.setLookAt(aBall.getPosition());
function renderScene() {
    // aBall.movetest();
    // render using requestAnimationFrame
    //更新鼠标位置
    // myMouse.initPosition();
    requestAnimationFrame(renderScene);
    renderer.render(scene,Camera.getCamera());
}
renderScene();
// renderer.render(scene,Camera.getCamera());

// function line(){
//     var geometry = new THREE.Geometry();
//     var material = new THREE.LineBasicMaterial({
//         vertexColors: true
//       });
//     //定义两种颜色分别是两个端点的颜色
//     var color1 = new THREE.Color( 0x444444 );
//     var color2 = new THREE.Color( 0xFF0000 );
//     //线的材质可以由两点的颜色决定
//     var p1 = new THREE.Vector3();
//     var p2 = new THREE.Vector3();
//     p1.set(-20,0,0);
//     p2.set(0,0,0);
//     geometry.vertices.push(p1);
//     geometry.vertices.push(p2);
//     geometry.colors.push(color1, color2);
//     //定义线条 这里会传进去三个参数  
//     //第一个是几何体geometry，里面包含两个顶点和顶点颜色
//     //第二个是线条的材质
//     // 第三个是一组点的连接方式
//     var line = new THREE.Line(geometry,material, THREE.LinePieces);
//     return line;
// }