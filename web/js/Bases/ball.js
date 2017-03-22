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
ball.prototype.doUpdate = function(position) {

    console.log("do move ");
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
    this.core.position.x = this.position.x;
    this.core.position.y = this.position.y;
    this.core.position.z = this.position.z;

    this.core.rotation.x = this.position.y;
    this.core.rotation.y = this.position.y;
    this.core.rotation.z = this.position.z;
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