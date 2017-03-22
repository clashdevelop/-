function ball(){
    drawBase.call(this);

    this.id = "";
    this.name = "";
    this.color = "";
    this.position = new position(0,0,0);//当前position
    this.nextPosition ;
    this.lastPosition = new position(0,0,0);
    this.radius = 4;
    //加的力
    this.power = 0;

}
(function(){
    var Super = function(){};
    Super.prototype = drawBase.prototype;
    ball.prototype = new Super();
})();
//小球位置更新，参数为目标位置和规定时间
ball.prototype.doUpdate = function(position,tiem,topTime) {
    //move test one
    // this.position.x += 0.02;
    // this.core.position.x = this.position.x;
    // this.core.position.y = this.position.y;
    // this.core.position.z = this.position.z;
    // this.core.rotation.y += 0.01;

    //move test two
    // var time = 0;
    // var leaseTime = 0;
    // for(;time<leaseTime;time++){
    //     leaseTime = topTime - time;
    //     var targX = (position.x - this.position.x) / leaseTime;
    //     var targY = (position.y - this.position.y) / leaseTime;
    //     var targZ = (position.z - this.position.z) / leaseTime;
    //     this.position.x += targX;
    //     this.position.y += targY;
    //     this.position.z += targZ;
    //     this.core.position.x = this.position.x;
    //     this.core.position.y = this.position.y;
    //     this.core.position.z = this.position.z;
    // }

    //move test three
    console.log("do move ");
    // var avageTargX = (position.x - this.position.x) / topTime;
    // var avageTargY = (position.y - this.position.y) / topTime;
    // var avageTargZ = (position.z - this.position.z) / topTime;    
    // this.position.x += avageTargX;
    // this.position.y += avageTargY;
    // this.position.z += avageTargZ;
    // this.core.position.x = this.position.x;
    // this.core.position.y = this.position.y;
    // this.core.position.z = this.position.z;

    //move test four
    this.position.x += 0.02;
    this.position.y += 0.02;
    this.position.z += 0.02;
    this.core.position.x = this.position.x;
    this.core.position.y = this.position.y;
    this.core.position.z = this.position.z;
};
//get / set
ball.prototype.getPosition = function() {
    return this.position;
};
ball.prototype.setPosition = function(position) {
    this.position = position;
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
//更新服务器接收位置
ball.prototype.setNextPosition = function(position) {
    this.nextPosition = position;
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