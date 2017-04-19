function ball(){
    drawBase.call(this);

    this.id = "0";
    this.name = "";
    this.color = "";

    //每个周期所需跳数
    this.cycleTime = 70;
    this.usedTime = 0;
    //位置
    this.position = new position(0,0,0);//当前position
    this.nextPosition = new position(0,0,0);
    this.lastPosition = new position(0,0,0);
    this.radius = 4;
    //加的力
    this.power = 0;
    //用于对比是否为新加入或退出
    this.flag = 0;
    //转速
    this.perRotation = 0.3;
    //作为旋转使用的K值
    // this.rotaX = 1;
    // this.rotaY = 1;
    this.rotaXAY = {x:0.0,y:1.0};
    this.xAxis;

}
(function(){
    var Super = function(){};
    Super.prototype = drawBase.prototype;
    ball.prototype = new Super();
})();
//小球位置更新，不传递参数，通过自身的 nextposition 更改
//小球的新position来自messageServer的新消息
ball.prototype.doUpdate = function() {
    this.moveToNext();
};
//运动方式1：向next position运动
ball.prototype.moveToNext = function() {
    //同步本地next position
    this.usedTime++;
    var currectPosition = this.getCurrectTime();
    console.log(currectPosition.x);
    if(this.position != this.nextPosition){
        
        this.position.x = currectPosition.x;
        this.position.y = currectPosition.y;
        this.position.z = 0;
        this.core.position.x = this.position.x;
        this.core.position.y = this.position.y;
        this.core.position.z = this.position.z;
        //网上找出的 矩阵旋转方案：
        //http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
        rotateAroundWorldAxis(this.core,this.xAxis,Math.PI / 360);
    }
};
//get / set
ball.prototype.getPosition = function() {
    return this.position;
};
ball.prototype.setPosition = function(position) {
    this.position = position;
    //初始化core.position
    this.core.position.x = position.getX();
    this.core.position.y = position.getY();
    this.core.position.z = position.getZ();
};
ball.prototype.getPower = function() {
    return this.power;
};
ball.prototype.setPower = function(power) {
    this.power = power;
};
ball.prototype.setRadius = function(radius) {
    this.radius = radius;
};
ball.prototype.getId = function() {
    return this.id;
};
ball.prototype.setId = function(id) {
    this.id = id;
};
ball.prototype.getCurrectTime = function() {
    var x = (this.nextPosition.x - this.lastPosition.x)*this.usedTime/this.cycleTime + this.lastPosition.x;
    var y = (this.nextPosition.y - this.lastPosition.y)*this.usedTime/this.cycleTime + this.lastPosition.y;
    return {'x':x,'y':y}
};
//更新服务器接收位置
//改变lastPosition的记录
//外加更新小球旋转角度
//重置周期使用时间
ball.prototype.setNextPosition = function(position) {
    this.nextPosition = position;
    this.lastPosition = this.position;
    this.rotaXAY = this.getRotateXAY(this.position,this.nextPosition);
    this.xAxis = new THREE.Vector3(this.rotaXAY.x,this.rotaXAY.y,0);

    this.usedTime = 0;
};
ball.prototype.getNextPosition = function() {
    return this.nextPosition;
};
//添加到scene
ball.prototype.draw = function(scene) {
    this.geometry = new THREE.SphereGeometry(this.radius, 40, 40);
    this.material = new THREE.MeshLambertMaterial({color: 0xd9d9d9});
    //初始小球，没有纹理
    // this.core = new THREE.Mesh(this.geometry,this.material);
    // this.core.position.x = this.position.getX();
    // this.core.position.y = this.position.getY();
    // this.core.position.z = this.position.getZ();
    // this.core.castShadow = true;
    //添加纹理的小球
    this.core = createMesh(new THREE.SphereGeometry(this.radius, 40, 40), "floor-wood.jpg");
    scene.add(this.core);
};

var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js r50-r58:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // new code for Three.js r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
ball.prototype.getRotateXAY = function(fromPosition,toPosition){
    //利用公式 y2=(x0-x1)*x2/(y1-y0)计算法向量，x2位
    var fX = fromPosition.getX();
    var fY = fromPosition.getY();
    var tX = toPosition.getX();
    var tY = toPosition.getY();
    var x2 = 1;
    var y2 = 0;
    if((tY-fY) > 0){
        x2 = -1;
    }else{
       x2 = 1;
    }
    if(tY == fY){
        if((tX - fX) > 0) y2 = 1;
        else y2 = -1;
    }else{
        y2 = (fX - tX)*x2*1.0/(tY - fY);
    }
    return {x:x2,y:y2}
}