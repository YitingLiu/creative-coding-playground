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
camera.position.set(50,15,0);
camera.lookAt(new THREE.Vector3(0,3,0));

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
keyLight.shadow.camera.right = 100; //default:5
keyLight.shadow.camera.top = 100; // default:5
keyLight.shadow.camera.bottom = -100; //default:-5

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
// var axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

//materials
var mat_orange = new THREE.MeshLambertMaterial({ color: 0xFF8C75 });
var mat_grey=new THREE.MeshLambertMaterial({color:0xf3f2f7});
var mat_yellow=new THREE.MeshLambertMaterial({color:0xfeb42b});
var mat_dark=new THREE.MeshLambertMaterial({color:0x5a6e6c});
var mat_brown=new THREE.MeshLambertMaterial({color:0xa3785f});
var mat_stone=new THREE.MeshLambertMaterial({color:0x9EAEAC});

//-------------------------------------islands-------------------------------------
var island=new THREE.Group();

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

island.add(ground);


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
island.add(tree);

var tree_1=tree.clone();
tree_1.scale.set(.8,.8,.8);
tree_1.position.set(-1,0,-5);
tree_1.rotation.y=-pi/5;
island.add(tree_1);

var tree_2=tree.clone();
tree_2.scale.set(.7,.7,.7);
tree_2.position.set(-2,0,.5);
tree_2.rotation.y=-pi/12;
tree_2.children[2].rotation.x=-pi/3;
tree_2.children[2].position.z=trunk.position.z-1;
tree_2.children[3].rotation.x=pi/3;
tree_2.children[3].position.z=trunk.position.z+1;
island.add(tree_2);

//-------------------------------------stone-------------------------------------
var geo_stone=new THREE.DodecahedronGeometry(1,0);
var stone=[];
for(var i=0;i<2;i++){
  stone[i]=new THREE.Mesh(geo_stone,mat_stone);
  island.add(stone[i]);
  stone[i].castShadow=true;
}
stone[0].rotation.set(0,12,pi/2);
stone[0].scale.set(3,1,1);
stone[0].position.set(-1,1,4.6);

stone[1].rotation.set(0,0,pi/2);
stone[1].scale.set(1,1,1);
stone[1].position.set(0,.7,5.3);


//-------------------------------------sheep-------------------------------------
//sheep body
var sheep=new THREE.Group();
// var geo_sheepHead=new THREE.SphereGeometry(.5,8,6);
var geo_sheepHead=new THREE.IcosahedronGeometry(1,0);
var sheepHead=new THREE.Mesh(geo_sheepHead,mat_dark);
sheepHead.scale.z=.6;
sheepHead.scale.y=1.1;
sheepHead.position.y=2.5;
sheepHead.rotation.x=-.2;
sheepHead.castShadow=true;
sheep.add(sheepHead);

var geo_sheepBody=new THREE.IcosahedronGeometry(3.5,0);
var sheepBody=new THREE.Mesh(geo_sheepBody,mat_grey);
sheepBody.position.set(0,sheepHead.position.y,-2.2);
sheepBody.scale.set(.5,.5,.6);
sheepBody.rotation.set(0,0,pi/3);
sheepBody.castShadow=true;
sheep.add(sheepBody);

var geo_tail=new THREE.IcosahedronGeometry(.5,0);
var tail=new THREE.Mesh(geo_tail,mat_grey);
tail.position.set(sheepHead.position.x,sheepHead.position.y+1.2,-3.8);
tail.castShadow=true;
sheep.add(tail);

var hair=[];
var geo_hair=new THREE.IcosahedronGeometry(.4,0)
for(var i=0;i<5;i++){
  hair[i]=new THREE.Mesh(geo_hair,mat_grey);
  hair[i].castShadow=true;
  sheep.add(hair[i]);
}

hair[0].position.set( -.4,sheepHead.position.y+.9,-.1);
hair[1].position.set(   0, sheepHead.position.y+1,-.1);
hair[2].position.set(  .4,sheepHead.position.y+.9,-.1);
hair[3].position.set( -.1,sheepHead.position.y+.9,-.4);
hair[4].position.set( .12,sheepHead.position.y+.9,-.4);

hair[0].rotation.set(pi/12,0,pi/3)
hair[1].rotation.set(pi/12,pi/6,pi/3)
hair[2].rotation.set(pi/12,0,pi/3)
hair[3].rotation.set(pi/12,0,pi/3)
hair[4].rotation.set(pi/12,pi/6,pi/3)

hair[0].scale.set(.6,.6,.6);
hair[2].scale.set(.8,.8,.8);
hair[3].scale.set(.7,.7,.7);
hair[4].scale.set(.6,.6,.6);

var legs=[];
var geo_leg=new THREE.CylinderGeometry(.15,.1,1,5);
for(var i=0;i<4;i++){
  legs[i]=new THREE.Mesh(geo_leg,mat_dark);
  legs[i].castShadow=true;
  legs[i].receiveShadow=true;
  sheep.add(legs[i]);
}
legs[0].position.set(.5,1.1,-1.5);
legs[1].position.set(-.5,1.1,-1.5);
legs[2].position.set(.8,1.1,-3);
legs[3].position.set(-.8,1.1,-3);

var feet=[];
var geo_foot=new THREE.DodecahedronGeometry(.2,0);
for(var i=0;i<legs.length;i++){
  feet[i]=new THREE.Mesh(geo_foot,mat_dark);
  sheep.add(feet[i]);
  feet[i].scale.set(1,.8,1);
  feet[i].castShadow=true;
  feet[i].receiveShadow=true;
  feet[i].position.set(legs[i].position.x,0,legs[i].position.z+.09);
}
feet[0].position.y=.56;
feet[1].position.y=.66;
feet[2].position.y=.7;
feet[3].position.y=.7;

//eyes
var geo_eye=new THREE.CylinderGeometry(.3,.2,.05,8);
var eyes=[];
for(var i=0;i<2;i++){
  eyes[i]=new THREE.Mesh(geo_eye,mat_grey);
  sheep.add(eyes[i]);
  eyes[i].castShadow=true;
  eyes[i].position.set(0,sheepHead.position.y+.1,.5);
  eyes[i].rotation.x=pi/2-pi/15;
}
eyes[0].position.x=.3;
eyes[1].position.x=-eyes[0].position.x;

eyes[0].rotation.z=-pi/15;
eyes[1].rotation.z=-eyes[0].rotation.z;

//eyeballs
var geo_eyeball=new THREE.SphereGeometry(.11,8,8);
eyeballs=[];
for(var i=0;i<2;i++){
  eyeballs[i]=new THREE.Mesh(geo_eyeball,mat_dark);
  sheep.add(eyeballs[i]);
  eyeballs[i].castShadow=true;
  eyeballs[i].position.set(eyes[i].position.x,eyes[i].position.y-.03,eyes[i].position.z+.02)
}
eyeballs[0].position.x+=.05;
eyeballs[1].position.x+=.05;

sheep.position.set(4.8,-.2,-1);
sheep.scale.set(.8,.8,.8);
sheep.rotation.set(0,pi/4,0);
island.add(sheep);

//fence
var fence=new THREE.Group();
var wood=[];
var geo_wood=new THREE.BoxGeometry(1,1,1);
for(var i=0;i<4;i++){
  wood[i]=new THREE.Mesh(geo_wood,mat_brown);
  fence.add(wood[i]);
  wood[i].castShadow=true;
  wood[i].receiveShadow=true;
}
wood[0].scale.set(.15,1.7,.4);
wood[1].scale.set(.15,1.8,.4);
wood[2].scale.set(.1,.3,3.2);
wood[3].scale.set(.1,.3,3.2);

wood[0].position.set(0,1.2,-1);
wood[1].position.set(0,1,1);
// wood[2].position.set(.12,1.5,0);
wood[2].position.set(0,1.5,0);
wood[3].position.set(.12,.9,0);

wood[3].rotation.x=pi/32;
wood[2].rotation.x=-pi/32;
wood[2].rotation.y=pi/32;

fence.position.set(3,0,2);
fence.rotation.y=pi/5;
island.add(fence);

// scene.add(island);

var islands=[];
for(var i=0;i<6;i++){
  islands[i]=island.clone();
  scene.add(islands[i]);
  islands[i].position.z=-20*i;
}


//-------------------------------------airplane-------------------------------------


// camera.position.set(20, 1, 10); //airplane front
// camera.position.set(30, 1, 0); //airplane left
// camera.position.set(20, 10, 0); //airplane top
// camera.lookAt(new THREE.Vector3(20, 0, 0));


var mat_purple=new THREE.MeshLambertMaterial({color:0x8086E3});

var box=new THREE.BoxGeometry(1,1,1);
var airplane=new THREE.Group();

var airplane_body=new THREE.Mesh(box,mat_purple);
airplane_body.scale.set(1,1,2.5);
airplane.add(airplane_body);

var airplane_cockpit=new THREE.Mesh(box,mat_purple);
airplane_cockpit.position.set(0,.8,0);
airplane_cockpit.scale.set(.9,.9,.9);
airplane.add(airplane_cockpit);

var airplane_wing=new THREE.Mesh(box,mat_purple);
airplane_wing.scale.set(4,.15,1);
airplane.add(airplane_wing);

var airpalne_tail=new THREE.Mesh(box,mat_purple);
var a=Math.sqrt(.5*.5+.75*.75);
airpalne_tail.position.set(0,.5-a*Math.sin(pi/4+pi+Math.atan(.75/.5))-1,1.75-.5+a*Math.cos(pi/4+pi+Math.atan(.75/.5)));
airpalne_tail.scale.set(1,1.5,1);
airpalne_tail.rotation.set(pi/4,0,0);
airplane.add(airpalne_tail);

airplane.position.set(20,0,0);
scene.add(airplane);


//gas
var Gas=function(x,y,z,speed){
  this.geometry=new THREE.DodecahedronGeometry(.5);
  this.gas=new THREE.Mesh(this.geometry,mat_grey);
  scene.add(this.gas);
  this.gas.position.x=x;
  this.gas.position.y=y;
  this.gas.position.z=z+.5*Math.random();
  this.lifespan=50;
  this.speed=speed;

  this.update=function(){
    this.gas.scale.x*=.97;
    this.gas.scale.y*=.97;
    this.gas.scale.z*=.97;
    this.gas.position.z-=this.speed;
    this.gas.position.y-=.05*Math.random();
    this.lifespan--;
  }
};

var gases=[];


//-------------------------------------Control-------------------------------------
let speed=.05;
let acc=.0005;
let res=.0005;

//height
let speed_lift=0;
let acc_lift=0;
let gravity=.005;

document.addEventListener("keydown",function(e){
  if(e.key=="ArrowRight"){
    acc+=.02;
    acc_lift+=.01;
  }
  if(e.key=="ArrowLeft") {
    acc-=.02;
  }
})








var count=0;
//render
var render = function () {
  speed+=acc;
  acc=.0005;
  if(speed>0) speed-=res;
  else speed=0;
  airplane.position.z-=speed;
  camera.position.z=airplane.position.z;

  speed_lift+=acc_lift;
  acc_lift=0;
  speed_lift-=gravity;
  if(airplane.position.y<0) {
    var buffer_bottom=-.2*speed_lift;
    buffer_bottom=Math.max(.02,buffer_bottom);
    speed_lift+=buffer_bottom;
  }
  airplane.position.y+=speed_lift;
  if(airplane.position.z<-100) airplane.position.z=0;

  //gas
  count++;
  if(count%8==0) gases.push(new Gas(airplane.position.x,airplane.position.y,airplane.position.z+2,speed*.6));

  for(var i=0;i<gases.length;i++){
    gases[i].update();
    if(gases[i].lifespan<0){
      scene.remove(scene.getObjectById(gases[i].gas.id));
      gases.splice(i,1);
    }
  }
  console.log(gases.length)


  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();























