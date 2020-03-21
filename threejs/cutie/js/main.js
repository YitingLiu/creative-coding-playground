//colors
var col_primary=0xffffff;

var scene = new THREE.Scene();
var h = window.innerHeight,
    w = window.innerWidth;
var aspectRatio = w / h,
    fieldOfView = 25,
    nearPlane = .1,
    farPlane = 1000;
var camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
var renderer = new THREE.WebGLRenderer({canvas: artboard, alpha: true, antialias: true});
renderer.setSize( w, h );
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

//camera
camera.position.set(40,.1,0);
camera.lookAt(new THREE.Vector3(0,0,0));

// camera.position.set(40,2,-25);
// camera.lookAt(new THREE.Vector3(0,0,0));


//lights, 3 point lighting
var light = new THREE.AmbientLight( col_primary,.5);

var keyLight = new THREE.DirectionalLight(col_primary, .6);
keyLight.position.set(10, 15, 10);
keyLight.castShadow = true;

var fillLight = new THREE.DirectionalLight(col_primary, .3);
fillLight.position.set(10, 10, -10);

var backLight = new THREE.DirectionalLight(col_primary, .1);
backLight.position.set(-10, 0, 0);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


// axis
var axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

//materials
var material = new THREE.MeshLambertMaterial( { color: 0xbec2c5 } );
var mat_black=new THREE.MeshLambertMaterial({color:0x505279});
var mat_yellow=new THREE.MeshLambertMaterial({color:0xeda01b});
var mat_green=new THREE.MeshLambertMaterial({color:0x809e5c});
var mat_skin=new THREE.MeshLambertMaterial({color:0xf6dbc3});
var mat_pink=new THREE.MeshLambertMaterial({color:0xf5978d});



//plane
var geo_plane = new THREE.BoxGeometry( 10, 1, 10 );
var material_plane = new THREE.ShadowMaterial({opacity:.4});
var plane = new THREE.Mesh( geo_plane, material_plane );
plane.position.set(0,-3.8,0);
plane.receiveShadow=true;
scene.add( plane );

// head
var group_head=new THREE.Group();

// var geo_head = new THREE.BoxGeometry( 4, 4, 4 );
// var geo_head = new THREE.SphereGeometry( 2.2, 10, 8 );
var geo_head=new THREE.IcosahedronGeometry(2.5);
var head = new THREE.Mesh( geo_head, mat_skin );
head.position.set(0,2.3,0);
head.castShadow=true;
group_head.add( head );

//hat
var group_hat=new THREE.Group();


//draw helper line
// var mat_line = new THREE.LineBasicMaterial({
//   color: 0x0000ff
// });

// const seg_hat=7;
// const seg_height=.5;
// let y=[],
//     z=[],
//     beta=[];
// beta[0]=Math.PI*90/180;
// beta[seg_hat-1]=Math.PI*60/180;

// for(var i=1;i<seg_hat-1;i++){
//   beta[i]=beta[i-1]+(beta[seg_hat-1]-beta[0])/seg_hat;
// }

// y[0]=0;
// z[0]=0;
// var points = [];
// points.push(new THREE.Vector3(0,y[0],z[0]));
// for(var i=1;i<seg_hat;i++){
//   y[i]=y[i-1]+seg_height*Math.sin(beta[i-1]);
//   z[i]=z[i-1]+seg_height*Math.cos(beta[i-1]);
//   points.push(new THREE.Vector3(0,y[i],z[i]));
// }
// var geo_line = new THREE.BufferGeometry().setFromPoints( points );
// var line = new THREE.Line( geo_line, mat_line );
// group_hat.add( line );

//hat brim
const brim_r=4;
const seg_bottom=11;
let shape;
shape = new THREE.Shape();
shape.moveTo( brim_r*Math.cos(0),brim_r*Math.sin(0) );
for(var i=0;i<seg_bottom-1;i++){
  var theta=2*Math.PI/seg_bottom*(i+1);
  shape.lineTo(brim_r*Math.cos(theta),brim_r*Math.sin(theta))
}
var extrudeSettings = {
  steps: 2,
  depth: .3,
  bevelEnabled:true,
  bevelThickness: .1,
  bevelSize: .2,
  bevelOffset: 0,
  bevelSegments: 3
};

var geo_brim = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var brim=new THREE.Mesh(geo_brim,mat_black);
brim.rotation.x=Math.PI/2;
group_hat.add(brim);

//hat crown
var geo_crown=new THREE.CylinderGeometry(0,2,4);
var crown=new THREE.Mesh(geo_crown,mat_black);
crown.position.y=2;
group_hat.add(crown);

//hat decoration
var geo_dec=new THREE.CylinderGeometry(1.5,1.75,.5);
var dec=new THREE.Mesh(geo_dec,mat_pink);
dec.position.y=.9;
group_hat.add(dec);


group_hat.position.set(0,3.62,-.3);
group_hat.rotation.set(-Math.PI/15,0,Math.PI/15);
group_head.add(group_hat);



//glass
var group_glasses=new THREE.Group();

var geo_glass = new THREE.TorusGeometry( .9, .2, 4 ,10);
var leftGlass = new THREE.Mesh( geo_glass, mat_black );
leftGlass.rotation.set(Math.PI/2-Math.PI*2/5,Math.PI/2,0);
leftGlass.position.z=1.2;
group_glasses.add( leftGlass );

var rightGlass = new THREE.Mesh( geo_glass, mat_black );
rightGlass.rotation.set(Math.PI/2-Math.PI*2/5,Math.PI/2,0);
rightGlass.position.z=-1.2;
group_glasses.add( rightGlass );

group_glasses.position.set(2.5,2.5,0);


group_head.add(group_glasses);
scene.add(group_head);





//upper body group
var group_upper = new THREE.Group();


// body
var geo_chest=new THREE.CylinderGeometry( 1, 2, 1.6,6 );
var chest=new THREE.Mesh(geo_chest,mat_green);
chest.position.set(0,-.75,0);
chest.castShadow=true;
group_upper.add(chest);

var geo_belly=new THREE.CylinderGeometry(2,1,.6,6);
var belly=new THREE.Mesh(geo_belly,mat_green);
belly.position.set(0,-1.9,0);
belly.castShadow=true;
group_upper.add(belly);

// arms
var armInitRotationX=Math.PI/8;
var armInitPositionY=-.4;

// var geo_arm = new THREE.BoxGeometry( .5, .5, 2 );
var geo_arm=new THREE.CylinderGeometry( .1, .3, 2,5);
var geo_hand=new THREE.IcosahedronGeometry(.6);

//left (arm + hand)
var group_leftArm=new THREE.Group();

var leftArm=new THREE.Mesh(geo_arm,mat_green);
leftArm.castShadow=true;
leftArm.rotation.x=Math.PI/2;
leftArm.position.z=-.3;
// leftArm.visible=false;
group_leftArm.add(leftArm);

var leftHand=new THREE.Mesh(geo_hand,mat_skin);
leftHand.position.z=1;
leftHand.castShadow=true;
group_leftArm.add(leftHand);


group_leftArm.rotation.x=armInitRotationX;
group_leftArm.position.set(0,Math.sin(-group_leftArm.rotation.x)+armInitPositionY,2.2);

group_upper.add(group_leftArm);

//right (arm + hand)
var group_rightArm=new THREE.Group();

var rightArm=new THREE.Mesh(geo_arm,mat_green);
rightArm.castShadow=true;
// rightArm.visible=false;
rightArm.rotation.x=-Math.PI/2;
rightArm.position.z=.3;
group_rightArm.add(rightArm);

var rightHand=new THREE.Mesh(geo_hand,mat_skin);
rightHand.position.z=-1;
rightHand.castShadow=true;
group_rightArm.add(rightHand);

group_upper.add(group_rightArm);

group_rightArm.rotation.x=-armInitRotationX;
group_rightArm.position.set(0,Math.sin(group_rightArm.rotation.x)+armInitPositionY,-2.2);

scene.add(group_upper);

//buttom body
var group_bottom=new THREE.Group();
//legs
// var geo_leg = new THREE.BoxGeometry( .5, 1, .5 );
var geo_leg=new THREE.CylinderGeometry( .4, .1, .5,5);
var leftLeg=new THREE.Mesh(geo_leg,mat_green);
leftLeg.position.set(0,-2.2,.5);
leftLeg.castShadow=true;
// leftLeg.visible=false;
group_bottom.add(leftLeg);

var rightLeg=new THREE.Mesh(geo_leg,mat_green);
rightLeg.position.set(0,-2.2,-.5);
rightLeg.castShadow=true;
// rightLeg.visible=false;
group_bottom.add(rightLeg);

//shoes
// var geo_shoe=new THREE.BoxGeometry(.8,.3,.6);
var geo_shoe=new THREE.IcosahedronGeometry(.5);
var leftShoe=new THREE.Mesh(geo_shoe,mat_black);
leftShoe.position.set(0,-2.85,-.5); // box y=-3.05
group_bottom.add(leftShoe);

var rightShoe=new THREE.Mesh(geo_shoe,mat_black);
rightShoe.position.set(0,-2.85,.5);
group_bottom.add(rightShoe);

scene.add(group_bottom);

//render
var render = function(){
	requestAnimationFrame( render );
  renderer.render( scene, camera );
}
render();

// mouse control
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var canvas = document.getElementById('artboard');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var rotateY=Math.PI*(mousePos.x-w/2)/w;
  var rotateZ=-Math.PI*(mousePos.y-h/2)/h;

  //head
  group_head.rotation.y=.75*rotateY;
  group_head.rotation.z=.5*rotateZ;
  group_head.position.x=-rotateZ;

  //upperbody
  group_upper.rotation.y=.25*rotateY;
  group_upper.rotation.z=.25*rotateZ;
  group_upper.position.x=.25*rotateZ;

  group_leftArm.rotation.x=-.7*rotateZ+armInitRotationX;
  group_leftArm.position.y=Math.sin(-group_leftArm.rotation.x)+armInitPositionY;
  group_rightArm.rotation.x=.7*rotateZ-armInitRotationX;
  group_rightArm.position.y=Math.sin(group_rightArm.rotation.x)+armInitPositionY;

  //bottom body
  group_bottom.rotation.y=.25*rotateY;
  group_bottom.position.x=.25*rotateZ;

}, false);


//text
// var fontSize1=.9;
// var loader = new THREE.FontLoader();
// loader.load( 'https://raw.githubusercontent.com/YitingLiu/poem/master/codepen/Lato_Bold.json', function(font){

//   //front
//   var posY=2.5;
//   var gap=(posY*2+fontSize1)/4;
//   var text1=createText("Hi there,",font,fontSize1);
//   text1.position.set(5,posY,4.5);
//   text1.rotation.y=Math.PI/2;
//   group.add(text1);

//   var text2=createText("I'm Yiting Liu.",font,fontSize1);
//   text2.position.set(5,posY-gap,4.5);
//   text2.rotation.y=Math.PI/2;
//   group.add(text2);

//   var text3=createText('a UX designer',font,fontSize1);
//   text3.position.set(5,posY-gap*2,4.5);
//   text3.rotation.y=Math.PI/2;
//   group.add(text3);

//   var text4=createText('in Shanghai',font,fontSize1);
//   text4.position.set(5,posY-gap*3,4.5);
//   text4.rotation.y=Math.PI/2;
//   group.add(text4);

//   var text5=createText('in Shanghai.',font,fontSize1);
//   text5.position.set(5,posY-gap*4,4.5);
//   text5.rotation.y=Math.PI/2;
//   group.add(text5);

// } );

// function createText(text,font,size){
//   var textGeo = new THREE.TextGeometry( text, {
// 		font: font,
// 		size: size,
// 		height: .1, // thickness
//     bevelEnabled: true,
// 		bevelThickness: .02,
// 		bevelSize: .02,
// 		bevelOffset: 0,
// 		bevelSegments: 3
// 	} );
//   var textMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
//   var text=new THREE.Mesh(textGeo,textMat);
//   return text;
// }

