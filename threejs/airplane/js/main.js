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

const dpi = window.devicePixelRatio;
renderer.setSize(w * dpi, h * dpi);
const canvas = document.getElementById("artboard");
canvas.style.width = `${w}px`;
canvas.style.height = `${h}px`;

renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

//camera
camera.position.set(25,15,0);
camera.lookAt(new THREE.Vector3(0,3,0));

// camera.position.set(0, 2, 25); //sheep front
// camera.position.set(8, 1, 0); //sheep left
// camera.position.set(0, 5, 0); //sheep top
// camera.lookAt(new THREE.Vector3(0, 2, 0));


//lights, 3 point lighting
var col_light = 0xffffff; // set

var light = new THREE.AmbientLight(col_light, 0.6);

var keyLight = new THREE.DirectionalLight(col_light, 0.6);
keyLight.position.set(20, 10, 10);
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
// var mat_orange = new THREE.MeshLambertMaterial({ color: 0xFF8C75 });
// var mat_grey=new THREE.MeshLambertMaterial({color:0xf3f2f7});
// var mat_yellow=new THREE.MeshLambertMaterial({color:0xfeb42b});
// var mat_dark=new THREE.MeshLambertMaterial({color:0x5a6e6c});
// var mat_brown=new THREE.MeshLambertMaterial({color:0xa3785f});
// var mat_stone=new THREE.MeshLambertMaterial({color:0x9EAEAC});
var mat_purple=new THREE.MeshStandardMaterial({
  color:0x8086E3,
  flatShading: true
});


//-------------------------------------airplane-------------------------------------
var airplane=new THREE.Group();
// var shape_body=createShape(1,8);  //(r,seg)
// var extrudeSettings={
//   steps: 2,
//   depth: 2,
//   bevelEnabled: true,
//   bevelThickness: .5,
//   bevelSize: .2,
//   bevelOffset: 0,
//   bevelSegments: 1
// }
var geo_body=new THREE.CylinderGeometry(1.5,2,10,8);
var body=new THREE.Mesh(geo_body,mat_purple);
body.rotation.x=pi/2;
airplane.add(body);
scene.add(airplane);

//gas
// var Gas=function(x,y,z,speed){
//   this.geometry=new THREE.DodecahedronGeometry(.5);
//   this.gas=new THREE.Mesh(this.geometry,mat_grey);
//   scene.add(this.gas);
//   this.gas.position.x=x;
//   this.gas.position.y=y;
//   this.gas.position.z=z+.5*Math.random();
//   this.lifespan=50;
//   this.speed=speed;

//   this.update=function(){
//     this.gas.scale.x*=.97;
//     this.gas.scale.y*=.97;
//     this.gas.scale.z*=.97;
//     this.gas.position.z-=this.speed;
//     this.gas.position.y-=.05*Math.random();
//     this.lifespan--;
//   }
// };


// var gases=[];

//-------------------------------------Control-------------------------------------
// let speed=.05;
// let acc=.0005;
// let res=.0005;

// //height
// let speed_lift=0;
// let acc_lift=0;
// let gravity=.005;

// document.addEventListener("keydown",function(e){
//   if(e.key=="ArrowRight"){
//     acc+=.02;
//     acc_lift+=.01;
//   }
//   if(e.key=="ArrowLeft") {
//     acc-=.02;
//   }
// })


// var count=0;
//render
var render = function () {
  // speed+=acc;
  // acc=.0005;
  // if(speed>0) speed-=res;
  // else speed=0;
  // airplane.position.z-=speed;
  // camera.position.z=airplane.position.z;

  // speed_lift+=acc_lift;
  // acc_lift=0;
  // speed_lift-=gravity;
  // if(airplane.position.y<0) {
  //   var buffer_bottom=-.2*speed_lift;
  //   buffer_bottom=Math.max(.02,buffer_bottom);
  //   speed_lift+=buffer_bottom;
  // }
  // airplane.position.y+=speed_lift;
  // if(airplane.position.z<-100) airplane.position.z=0;

  // //gas
  // count++;
  // if(count%8==0) gases.push(new Gas(airplane.position.x,airplane.position.y,airplane.position.z+2,speed*.6));

  // for(var i=0;i<gases.length;i++){
  //   gases[i].update();
  //   if(gases[i].lifespan<0){
  //     scene.remove(scene.getObjectById(gases[i].gas.id));
  //     gases.splice(i,1);
  //   }
  // }
  // console.log(gases.length)


  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();


function createShape(r,seg){
  let shape=new THREE.Shape();
  shape.moveTo( r*Math.cos(0),r*Math.sin(0) );
  for(var i=0;i<seg-1;i++){
    var theta=2*Math.PI/seg*(i+1);
    shape.lineTo(r*Math.cos(theta),r*Math.sin(theta))
  }
  return shape;
}




















