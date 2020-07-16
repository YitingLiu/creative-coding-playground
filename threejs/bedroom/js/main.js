var scene = new THREE.Scene();
var h = window.innerHeight,
  w = window.innerWidth;
// var aspectRatio = w / h,
//   fieldOfView = 50,
//   nearPlane = 1,
//   farPlane = 1000;
// var camera = new THREE.PerspectiveCamera(
//   fieldOfView,
//   aspectRatio,
//   nearPlane,
//   farPlane
// );
var camera = new THREE.OrthographicCamera( w / - 50, w / 50, h / 50, h / - 50, 1, 1000 );
// var camera = new THREE.OrthographicCamera( -10, 10, 10, -10, 1, 100 );

var renderer = new THREE.WebGLRenderer({
  canvas: artboard,
  alpha: true,
  antialias: true
});

const dpi = window.devicePixelRatio;
renderer.setSize(w * dpi, h * dpi);
const canvas = document.getElementById("artboard");
canvas.style.width = `${w}px`;
canvas.style.height = `${h}px`;

renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//camera
camera.position.set(15, 15, 15);
// camera.position.set(3, 1, 0); // front view
camera.lookAt(new THREE.Vector3(0, 0, 0));

//lights, 3 point lighting
var col_light = 0xffffff;

var light = new THREE.AmbientLight(col_light, .4);

var keyLight = new THREE.DirectionalLight(col_light, 0.2);
keyLight.position.set(-20, 30, 10);
keyLight.castShadow = true;
keyLight.shadow.camera.right = 15; //default:5
keyLight.shadow.camera.top = 10; // default:5

// var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );

var fillLight = new THREE.DirectionalLight(col_light, .7);
fillLight.position.set(20, 20, 20);

var backLight = new THREE.DirectionalLight(col_light, .2);
backLight.position.set(10, 0, -20);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// axis
var axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//materials
var pink = new THREE.MeshStandardMaterial({
  color: 0xf6cbcd,
  flatShading: true
});
var wood = new THREE.MeshStandardMaterial({
  color: 0xf4dfcc,
  flatShading: true
});
var grey = new THREE.MeshStandardMaterial({
  color: 0xc0bcb9,
  flatShading: true
});
var dark = new THREE.MeshStandardMaterial({
  color: 0x6d6d6d,
  flatShading: true
});
var white = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});
var glass = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  transparent:true,
  opacity:.3,
  flatShading: true
});



//-------------------ground & walls-------------------
var walls=new THREE.Group();
var thickness=.2;
var geo_ground = new THREE.CubeGeometry(10, thickness, 10);
var ground = new THREE.Mesh(geo_ground, white);
ground.position.set(ground.geometry.parameters.width/2, -ground.geometry.parameters.height/2, ground.geometry.parameters.depth/2);
ground.castShadow=true;
ground.receiveShadow=true;
walls.add(ground);

var geo_wall=new THREE.CubeGeometry(10,10+thickness,thickness);
var wall=new THREE.Mesh(geo_wall,white);
wall.position.set(wall.geometry.parameters.width/2,5-thickness/2,-wall.geometry.parameters.depth/2);
wall.castShadow=true;
wall.receiveShadow=true;
walls.add(wall);


var geo_wall_1=new THREE.CubeGeometry(thickness,10+thickness,10+thickness);
wall_1=new THREE.Mesh(geo_wall_1,white);
wall_1.position.set(-wall_1.geometry.parameters.width/2,5-thickness/2,5-thickness/2);
var geo_window=new THREE.CubeGeometry(1,5,7);
var mesh_window=new THREE.Mesh(geo_window,white);
mesh_window.position.set(0,5.5,5);
var wall_window=subtract(wall_1,mesh_window,white);
wall_window.castShadow=true;
wall_window.receiveShadow=true;
walls.add(wall_window);

var floors=[];
var geo_floor=new THREE.CubeGeometry(.45,.1,10);
for(var i=0;i<20;i++){
  floors[i]=new THREE.Mesh(geo_floor,wood);
  floors[i].position.set(.5*i+.25,0,5);
  floors[i].castShadow=true;
  floors[i].receiveShadow=true;
  walls.add(floors[i]);
}

scene.add(walls);

//-------------------window-------------------
var windows=new THREE.Group();
var window_glass=new THREE.Mesh(new THREE.CubeGeometry(.05,5,7),glass);
window_glass.receiveShadow=true;
windows.add(window_glass);

var frame_top=new THREE.Mesh(new THREE.CubeGeometry(.2,.2,7.25),white);
frame_top.position.y=2.5;
frame_top.castShadow=true;
frame_top.receiveShadow=true;
windows.add(frame_top);

var frame_bottom=new THREE.Mesh(new THREE.CubeGeometry(.5,.2,7.5),white);
frame_bottom.position.y=-2.5;
frame_bottom.castShadow=true;
frame_bottom.receiveShadow=true;
windows.add(frame_bottom);

var frame_left=new THREE.Mesh(new THREE.CubeGeometry(.2,5,.2),white);
frame_left.position.z=3.5;
frame_left.castShadow=true;
frame_left.receiveShadow=true;
windows.add(frame_left);

var frame_right=frame_left.clone();
frame_right.position.z=-3.5;
windows.add(frame_right);

var blinds=[];
for(var i=0;i<15;i++){
  blinds[i]=new THREE.Mesh(new THREE.CubeGeometry(.1,.05,6.6),wood);
  blinds[i].rotation.z=-1;
  blinds[i].position.y=2.3-.21*i;
  blinds[i].castShadow=true;
  blinds[i].receiveShadow=true;
  windows.add(blinds[i]);
}

var rope_middle=new THREE.Mesh(new THREE.CubeGeometry(.02,3.2,.02),grey);
rope_middle.position.y=.9;
rope_middle.castShadow=true;
rope_middle.receiveShadow=true;
windows.add(rope_middle);

var rope_left=rope_middle.clone();
rope_left.position.z=3.1;
windows.add(rope_left);

var rope_right=rope_middle.clone();
rope_right.position.z=-3.1;
windows.add(rope_right);


windows.position.set(0,5.5,5);
scene.add(windows);





//-------------------bed-------------------
var bed=new THREE.Group();

//headboard
var geo_headboard=new THREE.CubeGeometry(4,2,.2);
var headboard=new THREE.Mesh(geo_headboard,wood);
headboard.position.set(0,1,.1);
headboard.castShadow=true;
headboard.receiveShadow=true;
bed.add(headboard);

//board
var geo_board=new THREE.CubeGeometry(4,.2,6);
var board=new THREE.Mesh(geo_board,wood);
board.position.set(0,.5,board.geometry.parameters.depth/2);
board.castShadow=true;
board.receiveShadow=true;
bed.add(board);

//mattress
var mattress=new THREE.Mesh(new THREE.CubeGeometry(3.7,.5,5.7),white)
mattress.position.set(0,.8,3);
mattress.castShadow=true;
mattress.receiveShadow=true;
bed.add(mattress);




bed.position.set(6,0,0);

scene.add(bed);


//-------------------bench-------------------
var bench=new THREE.Group();
//bench body
var benchBody=new THREE.Mesh(new THREE.CubeGeometry(1.4,1.4,5),white);
var sub_box_upper=new THREE.Mesh(new THREE.CubeGeometry(1.4,.4,1.5),white);
sub_box_upper.position.set(.2,.35,0);
var sub_box_upper_1=sub_box_upper.clone();
sub_box_upper_1.position.set(.2,.35,1.6);
var sub_box_upper_2=sub_box_upper.clone();
sub_box_upper_2.position.set(.2,.35,-1.6);
var sub_box_bottom=new THREE.Mesh(new THREE.CubeGeometry(1.4,.6,1.5),white);
sub_box_bottom.position.set(.2,-.35,0);
var sub_box_bottom_1=sub_box_bottom.clone();
sub_box_bottom_1.position.set(.2,-.35,1.6);
var sub_box_bottom_2=sub_box_bottom.clone();
sub_box_bottom_2.position.set(.2,-.35,-1.6);
var benchBody=subtract(benchBody,sub_box_upper,white);
var benchBody=subtract(benchBody,sub_box_bottom,white);
var benchBody=subtract(benchBody,sub_box_upper_1,white);
var benchBody=subtract(benchBody,sub_box_bottom_1,white);
var benchBody=subtract(benchBody,sub_box_upper_2,white);
var benchBody=subtract(benchBody,sub_box_bottom_2,white);
benchBody.castShadow=true;
benchBody.receiveShadow=true;
bench.add(benchBody);

//drawer
var drawer=new THREE.Mesh(new THREE.CubeGeometry(1.2,.55,1.45),white);
drawer.position.set(.1,-.35,0);
var drawer_1=drawer.clone();
drawer_1.position.set(.1,-.35,1.6);
var drawer_2=drawer.clone();
drawer_2.position.set(.1,-.35,-1.6);
var handle=new THREE.Mesh(new THREE.SphereGeometry(.05),dark);
handle.position.set(.7,-.25,0);
var handle_1=handle.clone();
handle_1.position.set(.7,-.25,1.6);
var handle_2=handle.clone();
handle_2.position.set(.7,-.25,-1.6);

drawer.castShadow=true;
drawer_1.castShadow=true;
drawer_2.castShadow=true;
drawer.receiveShadow=true;
drawer_1.receiveShadow=true;
drawer_2.receiveShadow=true;

bench.add(handle);
bench.add(drawer);
bench.add(handle_1);
bench.add(drawer_1);
bench.add(handle_2);
bench.add(drawer_2);


//bench top
var benchTop=new THREE.Mesh(new THREE.CubeGeometry(1.6,.1,5.2),white);
benchTop.position.y=.7;
benchTop.castShadow=true;
benchTop.receiveShadow=true;
bench.add(benchTop);

//feet
var benchFoot=new THREE.Mesh(new THREE.CubeGeometry(.1,.5,.1),white);
var benchFoot_1=benchFoot.clone();
var benchFoot_2=benchFoot.clone();
var benchFoot_3=benchFoot.clone();
benchFoot.position.set(.65,-.9,2.45);
benchFoot_1.position.set(.65,-.9,-2.45);
benchFoot_2.position.set(-.65,-.9,2.45);
benchFoot_3.position.set(-.65,-.9,-2.45);
benchFoot.castShadow=true;
benchFoot.receiveShadow=true;
benchFoot_1.castShadow=true;
benchFoot_1.receiveShadow=true;
benchFoot_2.castShadow=true;
benchFoot_2.receiveShadow=true;
benchFoot_3.castShadow=true;
benchFoot_3.receiveShadow=true;
bench.add(benchFoot);
bench.add(benchFoot_1);
bench.add(benchFoot_2);
bench.add(benchFoot_3);




bench.position.set(.7,1.2,5);
scene.add(bench);



//-------------------wall shelf-------------------
var shelf_bottom=new THREE.Mesh(new THREE.CubeGeometry(3,.1,1),wood);
shelf_bottom.position.set(3,3.5,.15);
shelf_bottom.castShadow=true;
shelf_bottom.receiveShadow=true;
scene.add(shelf_bottom);

var shelf_upper=new THREE.Mesh(new THREE.CubeGeometry(2.5,.1,1),wood);
shelf_upper.position.set(2.75,5.2,.15);
shelf_upper.castShadow=true;
shelf_upper.receiveShadow=true;
scene.add(shelf_upper);

var books=[];
for(var i=0;i<15;i++){
  var mat=white;
  switch(i%4){
    case 0:
      mat=dark;
      break;
    case 1:
      mat=pink;
      break;
    case 2:
      mat=grey;
      break;
    case 3:
      mat=white
  }
  books[i]=new THREE.Mesh(new THREE.CubeGeometry(.15,.9,.6),mat);
  books[i].castShadow=true;
  books[i].receiveShadow=true;

  if(i<6) books[i].position.set(1.7+.2*i,5.7,.3);
  else books[i].position.set(1.7+.2*(i-6),4,.3);
  scene.add(books[i]);
}


//------------------- sofa -------------------
var sofa=new THREE.Group();
var cushion=new THREE.Mesh(new THREE.CubeGeometry(1.4,.3,1.4),pink);
cushion.castShadow=true;
cushion.receiveShadow=true;
sofa.add(cushion);
var back=new THREE.Mesh(new THREE.CubeGeometry(.3,1.4,1.4),pink);
back.rotation.z=Math.PI/8;
back.position.set(-.8,.6,0);
back.castShadow=true;
back.receiveShadow=true;
sofa.add(back);



var batten=new THREE.Mesh(new THREE.CubeGeometry(1.3,.2,.08),wood);
batten.position.set(-.1,0,.8);
batten.castShadow=true;
batten.receiveShadow=true;
sofa.add(batten);
var batten_1=batten.clone();
batten_1.position.set(-.1,0,-.8);
batten_1.castShadow=true;
batten_1.receiveShadow=true;
sofa.add(batten_1);

var armrest=new THREE.Mesh(new THREE.CubeGeometry(1.7,.1,.2),wood);
armrest.position.set(-.2,.5,.8);
armrest.castShadow=true;
armrest.receiveShadow=true;
sofa.add(armrest);
var armrest_1=armrest.clone();
armrest_1.position.set(-.2,.5,-.8);
armrest_1.castShadow=true;
armrest_1.receiveShadow=true;
sofa.add(armrest_1);

var batten_back=new THREE.Mesh(new THREE.CubeGeometry(.1,.1,1.5),wood);
batten_back.position.set(-1,.5,0);
batten_back.castShadow=true;
batten_back.receiveShadow=true;
sofa.add(batten_back);

var foot_front=new THREE.Mesh(new THREE.CubeGeometry(.1,1,.1),wood);
foot_front.position.set(.6,0,.8);
foot_front.rotation.z=.15;
foot_front.castShadow=true;
foot_front.receiveShadow=true;
sofa.add(foot_front);
var foot_front_1=foot_front.clone();
foot_front_1.position.set(.6,0,-.8);
foot_front_1.rotation.z=.15;
foot_front_1.castShadow=true;
foot_front_1.receiveShadow=true;
sofa.add(foot_front_1);

var foot_back=new THREE.Mesh(new THREE.CubeGeometry(.15,1,.1),wood);
foot_back.position.set(-.7,0,.8);
foot_back.rotation.z=-.13;
foot_back.castShadow=true;
foot_back.receiveShadow=true;
sofa.add(foot_back);
var foot_back_1=foot_back.clone();
foot_back_1.position.set(-.7,0,-.8);
foot_back_1.rotation.z=-.13;
foot_back_1.castShadow=true;
foot_back_1.receiveShadow=true;
sofa.add(foot_back_1);


sofa.rotation.y=2.9;
sofa.position.set(8,.5,8);
scene.add(sofa);









//render
var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();


//threeCSG, mesh1-mesh2
function subtract(mesh1,mesh2,material) {
  var mesh1_BSP = new ThreeBSP(mesh1);
  var mesh2_BSP = new ThreeBSP(mesh2);
  var result_BSP = mesh1_BSP.subtract(mesh2_BSP);
  var result_mesh = result_BSP.toMesh(material);
  // result_mesh.geometry.computeFaceNormals();
  // result_mesh.geometry.computeVertexNormals();
  return result_mesh;
}



// GSAP
let tl = gsap.timeline();
tl.from(ground.scale, { duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"1")
  .from(wall.scale, { duration:1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=.8")
  .from(wall_window.scale, { duration:1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=.8")
  .from(windows.rotation,{duration:1,z: 1, ease:"power3.inOut"},"-=.5")
  .from(windows.scale,{duration:1,x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=1")
  .from(bench.scale,{duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"})
  .from(shelf_bottom.scale,{duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=2.5")
  .from(shelf_upper.scale,{duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=2")
  .from(bed.scale,{duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=1.2")
  .from(sofa.scale,{duration: 1, x: 0, y: 0, z: 0, ease:"power3.inOut"},"-=.5")
  .from(sofa.rotation,{duration: 1, y: 0, ease:"power3.inOut"},"-=1");


let tl_1=gsap.timeline();
for(var i=0;i<20;i++){
  var start=2;
  switch(i%5){
    case 0:
      start=1.8;
      break;
    case 1:
      start=2;
      break;
    case 2:
      start=1.9;
      break;
    case 3:
      start=2.1;
      break;
    case 4:
      start=2.2;
  }
  tl_1.from(floors[i].scale,{duration:.4,x:0,y:0,z:0,ease:"power3.inOut"},start);
  tl_1.from(floors[i].position, {duration: .4, z: 0, ease:"power3.inOut"},start);
}

let tl_2=gsap.timeline();
  tl_2.from(books[0].scale,{duration:.3,x:0,y:0,z:0,ease:"power3.inOut"},"2.6");
  tl_2.from(books[0].position, {duration: .3, z: 0, ease:"power3.inOut"},"-=.3");
for(var i=1;i<books.length;i++){
  tl_2.from(books[i].scale,{duration:.3,x:0,y:0,z:0,ease:"power3.inOut"},"-=.25");
  tl_2.from(books[i].position, {duration: .3, z: 0, ease:"power3.inOut"},"-=.3");
}