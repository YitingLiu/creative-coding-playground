// for convenience
var pi = Math.PI;

// set up physi.js
Physijs.scripts.worker = 'js/physijs/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';


var scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0,-5,0));

var h = window.innerHeight,
  w = window.innerWidth;
var aspectRatio = w / h,
  fieldOfView = 45,
  nearPlane = 1,
  farPlane = 1000;
var camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);
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
camera.position.set(25,15,0);
camera.lookAt(new THREE.Vector3(0,0,0));

// camera.position.set(0, 2, 25); //sheep front
// camera.position.set(8, 1, 0); //sheep left
// camera.position.set(0, 5, 0); //sheep top
// camera.lookAt(new THREE.Vector3(0, 2, 0));


//lights, 3 point lighting
var col_light = 0xffffff; // set

var light = new THREE.AmbientLight(col_light, 0.6);

var keyLight = new THREE.DirectionalLight(col_light, 0.6);
keyLight.position.set(20, 30, 10);
keyLight.castShadow = true;

keyLight.shadow.camera.left = -10; //default:-5
keyLight.shadow.camera.right = 10; //default:5
keyLight.shadow.camera.top = 10; // default:5
keyLight.shadow.camera.bottom = -10; //default:-5

// var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );

var fillLight = new THREE.DirectionalLight(col_light, 0.3);
fillLight.position.set(-20, 20, 20);

var backLight = new THREE.DirectionalLight(col_light, 0.1);
backLight.position.set(10, 0, -20);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// axis
var axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//materials
var mat_orange = new THREE.MeshStandardMaterial({
  color: 0xFF8C75,
  flatShading:true,
  side:THREE.DoubleSide
});
var mat_grey=new THREE.MeshStandardMaterial({color:0xf3f2f7,flatShading:true});
// var mat_yellow=new THREE.MeshLambertMaterial({color:0xfeb42b});
var mat_dark=new THREE.MeshStandardMaterial({color:0x5a6e6c,flatShading:true});
// var mat_brown=new THREE.MeshLambertMaterial({color:0xa3785f});
// var mat_stone=new THREE.MeshLambertMaterial({color:0x9EAEAC});
// var mat_purple=new THREE.MeshStandardMaterial({color:0x8086E3});
//physijs materials
var ground_material=Physijs.createMaterial(mat_grey,0,0);
var ball_material=Physijs.createMaterial(mat_orange,5,0);//friction,restitution
var mouth_material=Physijs.createMaterial(mat_dark,0,0);


var groundGeom=new THREE.BoxGeometry(20,.1,20);
var ground=new Physijs.BoxMesh(groundGeom,ground_material,0);//gravity
// ground.rotation.x=pi/12;
scene.add(ground);

// var ballGeom=new THREE.SphereGeometry(.5);
// var ball=new Physijs.SphereMesh(ballGeom,ball_material,5);
// ball.position.y=10;
// scene.add(ball);

var mouthGeom=new THREE.CylinderGeometry(.2,.2,1,16);
var mouth=new Physijs.CylinderMesh(mouthGeom,mouth_material,5);
mouth.position.set(0,2,1.5);
scene.add(mouth);


var bodyGeom = new THREE.CylinderGeometry( 2, 2, 1, 32);
var body=new Physijs.CylinderMesh(bodyGeom,ball_material,5);
body.position.y=.5+3;
body.rotation.set(pi/2,0,pi/2);
scene.add(body);

var constraint=new Physijs.PointConstraint(body,mouth,mouth.position);
scene.addConstraint(constraint);






//--------------------render----------------------------------------
var render = function () {
  // ground.rotation.x+=.1;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  scene.simulate();
};
render();


















