function ball(){
    drawBase.call(this);

    this.id = "";
    this.name = "";
    this.color = "";
    this.position = new position(0,0,0);//当前position
    this.nextPosition ;
    this.radius = 4;
    //加的力
    this.power = 0;

}
(function(){
    var Super = function(){};
    Super.prototype = drawBase.prototype;
    ball.prototype = new Super();
})();
//方法
// ball.prototype.movetest = function() {
//     this.core.rotation.x += 0.02;
// };
//get 、 set
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
    this.core = new THREE.Mesh(this.geometry,this.material);
    //this.core = this.createMesh(new THREE.SphereGeometry(5, 20, 20));//添加纹理的代码
    this.core.position.x = this.position.getX();
    this.core.position.y = this.position.getY();
    this.core.position.z = this.position.getZ();
    this.core.castShadow = true;
    scene.add(this.core);
};