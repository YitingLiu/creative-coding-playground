// for convenience
var pi = Math.PI;

var scene = new THREE.Scene();

//fog
  // const color = 0xFFFFFF;  // white
  // const near = 0;
  // const far = 100;
  // scene.fog = new THREE.Fog(color, near, far);

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
camera.position.set(20,5,20);
camera.lookAt(new THREE.Vector3(0,5,0));

// camera.position.set(0, 1, 5); //sheep front
// camera.position.set(5, 1, -1); //sheep left
// camera.position.set(0, 5, 0); //sheep top
// camera.lookAt(new THREE.Vector3(0, 1, 0));

//top camera
// camera.position.set(0, 20, 0);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

//lights, 3 point lighting
var col_light = 0xffffff; // set

var light = new THREE.AmbientLight(col_light, 0.6);

var keyLight = new THREE.DirectionalLight(col_light, 0.6);
keyLight.position.set(20, 30, 10);
keyLight.castShadow = true;

keyLight.shadow.camera.left = -5; //default:-5
keyLight.shadow.camera.right = 25; //default:5
keyLight.shadow.camera.top = 20; // default:5
keyLight.shadow.camera.bottom = -20; //default:-5

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
var mat_orange = new THREE.MeshLambertMaterial({ color: 0xFF8C75 });
var mat_grey=new THREE.MeshLambertMaterial({color:0xf3f2f7});
var mat_yellow=new THREE.MeshLambertMaterial({color:0xfeb42b});
var mat_dark=new THREE.MeshLambertMaterial({color:0x5a6e6c});
//-------------------------------------ground-------------------------------------
var layers = [];
var ground = new THREE.Group();
for (var i = 0; i < 5; i++) {
  var h=.1;
  var geometry = new THREE.CylinderGeometry(8 - i -.01, 8 - i, h, 9);
  layers.push(new THREE.Mesh(geometry, mat_orange));
  layers[i].position.y = h * i;
  layers[i].receiveShadow = true;
  ground.add(layers[i]);
}
layers[0].scale.x = .8;
layers[1].scale.set(.77,1,.91);
layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
layers[2].scale.set(.8,1,.91);
layers[2].rotation.y = ((2 * pi) / 9) * 0.3;
layers[3].scale.set(.75,1,.92);
layers[3].rotation.y = ((2 * pi) / 9) * 0.7;
layers[4].scale.set(.7,1,.93);
layers[4].rotation.y = ((2 * pi) / 9) * 0.9;

var geo_base=new THREE.CylinderGeometry(8 , 1, 10, 9);
var base=new THREE.Mesh(geo_base,mat_dark);
base.scale.x=layers[0].scale.x;
base.position.y=-5;
ground.add(base);

scene.add(ground);


//-------------------------------------trees-------------------------------------
var tree=new THREE.Group();

//trunk
var geo_trunk=new THREE.IcosahedronGeometry(9,0);
var trunk=new THREE.Mesh(geo_trunk,mat_grey);
var a = new THREE.Vector3( 1, 0,10 );
trunk.rotation.x=pi/2;
trunk.position.y=5;
trunk.scale.set(.03,.03,1);
trunk.castShadow=true;
trunk.receiveShadow=true;
tree.add(trunk);

//crown
var geo_crown=new THREE.IcosahedronGeometry(2.5,0);
var crown=new THREE.Mesh(geo_crown,mat_yellow);
crown.scale.y=.4;
crown.rotation.z=-.5;
crown.rotation.x=-.2;
crown.position.set(trunk.position.x,12,trunk.position.z);
crown.castShadow=true;
tree.add(crown);

//leaf
var leaf=new THREE.Group();
var mainStem=new THREE.Mesh(geo_trunk,mat_grey);
mainStem.scale.set(.007,.007,.16);
mainStem.rotation.x=pi/2;
mainStem.castShadow=true;
leaf.add(mainStem);

var geo_blade=new THREE.CylinderGeometry(.7,.7,.05,12);
var blade=new THREE.Mesh(geo_blade,mat_yellow);
blade.rotation.z=pi/2;
blade.scale.x=1.2;
blade.position.set(-.05,.4,0);
blade.castShadow=true;
leaf.add(blade);

var subStems=[];
for(var i=0;i<8;i++){
  subStems[i]=mainStem.clone();
  subStems[i].scale.set(.0055,.0055,.01);
  subStems[i].castShadow=true;
  leaf.add(subStems[i]);
}
subStems[0].rotation.x=-pi/4;
subStems[0].scale.z=.04;
subStems[0].position.set(0,.8,.2);

subStems[2].rotation.x=-pi/6;
subStems[2].scale.z=.05;
subStems[2].position.set(0,.5,.25);

subStems[4].rotation.x=-pi/8;
subStems[4].scale.z=.055;
subStems[4].position.set(0,.2,.3);

subStems[6].rotation.x=-pi/10;
subStems[6].scale.z=.045;
subStems[6].position.set(0,-.1,.26);

for(var i=1;i<8;i+=2){
  subStems[i].rotation.x=-subStems[i-1].rotation.x;
  subStems[i].scale.z=subStems[i-1].scale.z;
  subStems[i].position.set(0,subStems[i-1].position.y,-subStems[i-1].position.z);
}
leaf.rotation.x=pi/3;
leaf.rotation.z=.2;
leaf.position.set(trunk.position.x-.2,5,trunk.position.z+1);
tree.add(leaf);

var leaf_1=leaf.clone();
leaf_1.rotation.x=-pi/3;
leaf_1.position.set(trunk.position.x-.2,6,trunk.position.z-1);
tree.add(leaf_1);
tree.rotation.y=-pi/12;
tree.position.set(-2,0,-2);
scene.add(tree);

var tree_1=tree.clone();
tree_1.scale.set(.8,.8,.8);
tree_1.position.set(-1,0,-5);
tree_1.rotation.y=-pi/5;
scene.add(tree_1);

var tree_2=tree.clone();
tree_2.scale.set(.7,.7,.7);
tree_2.position.set(-2,0,.5);
tree_2.rotation.y=-pi/12;
tree_2.children[2].rotation.x=-pi/3;
tree_2.children[2].position.z=trunk.position.z-1;
tree_2.children[3].rotation.x=pi/3;
tree_2.children[3].position.z=trunk.position.z+1;
scene.add(tree_2);


//-------------------------------------sheep-------------------------------------
//sheep body
var sheep=new THREE.Group();
// var geo_sheepHead=new THREE.SphereGeometry(.5,8,6);
var geo_sheepHead=new THREE.IcosahedronGeometry(1,0);
var sheepHead=new THREE.Mesh(geo_sheepHead,mat_dark);
sheepHead.scale.z=.6;
sheepHead.position.y=3;
sheepHead.rotation.x=-.2;

var geo_sheepBody=new THREE.IcosahedronGeometry(4,0);
var sheepBody=new THREE.Mesh(geo_sheepBody,mat_grey);
sheepBody.position.set(0,3,-2.2);
sheepBody.scale.set(.5,.5,.6);
sheepBody.rotation.set(0,0,pi/3);
sheep.add(sheepBody);

var hair=[];
var geo_hair=new THREE.IcosahedronGeometry(.4,0)
for(var i=0;i<5;i++){
  hair[i]=new THREE.Mesh(geo_hair,mat_grey);
  sheep.add(hair[i]);
}
hair[0].position.set(-.25,3.8, .1);
hair[1].position.set(   0, 4, .1);
hair[2].position.set( .4,3.9, 0);
hair[3].position.set(-.1, 3.9,-.3);
hair[4].position.set(  .12,3.9,-.3);

hair[0].rotation.set(pi/12,0,pi/3)
hair[1].rotation.set(pi/12,pi/6,pi/3)
hair[2].rotation.set(pi/12,0,pi/3)
hair[3].rotation.set(pi/12,0,pi/3)
hair[4].rotation.set(pi/12,pi/6,pi/3)

hair[0].scale.set(.6,.6,.6);
hair[2].scale.set(.8,.8,.8);
hair[3].scale.set(.7,.7,.7);
hair[4].scale.set(.6,.6,.6);

sheep.add(sheepHead);




// sheep.scale.set(2,2,2);

scene.add(sheep);





//render
var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();