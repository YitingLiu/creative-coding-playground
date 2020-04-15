// for convenience
var pi = Math.PI;

var scene = new THREE.Scene();
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
renderer.setSize(w, h);
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//camera
// camera.position.set(30,5,-10);
// camera.lookAt(new THREE.Vector3(0,0,-10));

camera.position.set(30, 30, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

//top camera
// camera.position.set(0, 30, 0);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

//lights, 3 point lighting
var col_light = 0xffffff; // set

var light = new THREE.AmbientLight(col_light, 0.5);

var keyLight = new THREE.DirectionalLight(col_light, 0.6);
keyLight.position.set(20, 30, 20);
keyLight.castShadow = true;

keyLight.shadow.camera.left = -5; //default:-5
keyLight.shadow.camera.right = 25; //default:5
keyLight.shadow.camera.top = 20; // default:5
keyLight.shadow.camera.bottom = -20; //default:-5

// var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );

var fillLight = new THREE.DirectionalLight(col_light, 0.3);
fillLight.position.set(20, 20, -20);

var backLight = new THREE.DirectionalLight(col_light, 0.1);
backLight.position.set(-20, 0, 0);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// axis
var axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//materials
var mat_orange = new THREE.MeshLambertMaterial({ color: 0xf1866e });

//ground
var layers = [];
var ground = new THREE.Group();
for (var i = 0; i < 2; i++) {
  var geometry = new THREE.CylinderGeometry(8 - i - 0.3, 8 - i, 0.15, 9);
  layers.push(new THREE.Mesh(geometry, mat_orange));
  layers[i].position.y = 0.15 * i;
  ground.add(layers[i]);
}

layers[0].scale.x = 0.8;
layers[1].scale.set(0.8, 1, 0.95);
layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
scene.add(ground);

//render
var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();