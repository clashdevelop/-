function init(event){
  // document.addEventListener('mousemove', mouseMove, false);
  createScene();

  meshLoad();
  createLights();
  createMouse();
  createAxes();
  loadBalls();
  loadMap();

  doConnect();
  
  loop();
}
function loop(){
  if(readyLoop){
    console.log("loop");
    time = systemUpdate(time,receiveTime);
  }
  renderer.render(scene,Camera.getCamera());
  requestAnimationFrame(loop);
}
// function changeFunction(){
//   backgroundColor = 0x000000;
//   renderer.setClearColor(new THREE.Color(backgroundColor, 1.0));
// }
window.addEventListener('load', init, false);