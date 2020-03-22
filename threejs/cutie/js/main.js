//colors
var col_primary=0xffffff;

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
    farPlane);
var renderer = new THREE.WebGLRenderer({canvas: artboard, alpha: true, antialias: true});
renderer.setSize( w, h );
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

//camera
camera.position.set(30,5,-10);
camera.lookAt(new THREE.Vector3(0,0,-10));

// camera.position.set(30,1,0);
// camera.lookAt(new THREE.Vector3(0,0,0));


//lights, 3 point lighting
var light = new THREE.AmbientLight( col_primary,.5);

var keyLight = new THREE.DirectionalLight(col_primary, .6);
keyLight.position.set(20, 30, 20);
keyLight.castShadow = true;

keyLight.shadow.camera.left=-5;  //default:-5
keyLight.shadow.camera.right=25;  //default:5
keyLight.shadow.camera.top=20;  // default:5
keyLight.shadow.camera.bottom=-20; //default:-5

// var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );


var fillLight = new THREE.DirectionalLight(col_primary, .3);
fillLight.position.set(20, 20, -20);

var backLight = new THREE.DirectionalLight(col_primary, .1);
backLight.position.set(-20, 0, 0);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


// axis
// var axesHelper = new THREE.AxesHelper( 50 );
// scene.add( axesHelper );

//materials
var mat_black=new THREE.MeshLambertMaterial({color:0x505279});
var mat_yellow=new THREE.MeshLambertMaterial({color:0xeda01b});
var mat_green=new THREE.MeshLambertMaterial({color:0x809e5c});
var mat_skin=new THREE.MeshLambertMaterial({color:0xf6dbc3});
var mat_pink=new THREE.MeshLambertMaterial({color:0xf5978d});
var mat_white=new THREE.MeshLambertMaterial({color:0xd4d9db});


//plane
var geo_plane = new THREE.BoxGeometry( 800, 1, 200 );
var material_plane = new THREE.ShadowMaterial({opacity:.4});
var plane = new THREE.Mesh( geo_plane, material_plane);
plane.position.set(-380,-3.8,0);
plane.receiveShadow=true;
scene.add( plane );


//---------------cutie-------------------
var group_cutie=new THREE.Group();
// head
var group_head=new THREE.Group();

// var geo_head = new THREE.BoxGeometry( 4, 4, 4 );
var geo_head = new THREE.SphereGeometry( 2.2, 10, 8 );
// var geo_head=new THREE.IcosahedronGeometry(2.5);
var head = new THREE.Mesh( geo_head, mat_skin );
head.position.set(0,2.3,0);
head.castShadow=true;
group_head.add( head );

//hat
var group_hat=new THREE.Group();

//hat brim
const brim_r=4;
const seg_bottom=11;
let brim_shape=createShape(4,11);
var extrudeSettings = {
  steps: 2,
  depth: .3,
  bevelEnabled:true,
  bevelThickness: .1,
  bevelSize: .2,
  bevelOffset: 0,
  bevelSegments: 3
};

var geo_brim = new THREE.ExtrudeGeometry( brim_shape, extrudeSettings );
var brim=new THREE.Mesh(geo_brim,mat_black);
brim.castShadow=true;
brim.rotation.x=Math.PI/2;
group_hat.add(brim);

//hat crown
var geo_crown=new THREE.CylinderGeometry(0,2.3,4.3);
var crown=new THREE.Mesh(geo_crown,mat_black);
crown.position.y=2;
crown.castShadow=true;
group_hat.add(crown);

//hat decoration
var geo_dec=new THREE.CylinderGeometry(1.9,2.33,.6);
var dec=new THREE.Mesh(geo_dec,mat_pink);
dec.position.y=.4;
group_hat.add(dec);


group_hat.position.set(-.5,3.7,.3);
group_hat.rotation.set(Math.PI/15,0,Math.PI/15);
group_head.add(group_hat);

//hair
let shape_hair=createShape(.45,8);
var curve = new THREE.CubicBezierCurve3(
  new THREE.Vector3( 0, 1.8, 0 ),
  new THREE.Vector3( 0, 1.5, -4 ),
  new THREE.Vector3( 0, 0, -.5 ),
  new THREE.Vector3( 0, -1.5, -3.2 )
);
var extrudeSettings = {
  steps: 11,
  extrudePath:curve
};

var geo_hair = new THREE.ExtrudeGeometry( shape_hair, extrudeSettings );
var hair=new THREE.Mesh(geo_hair,mat_black);
hair.castShadow=true;
hair.position.y=2.4;
hair.rotation.y=-Math.PI/10;
var hairs=[];
group_head.add(hair);
for(var i=1;i<13;i++){
  hairs[i]=hair.clone();
  hairs[i].rotation.y=Math.PI/10*i-Math.PI/10;
  group_head.add(hairs[i]);
  const k=.145;
  if(i<=6) hairs[i].position.y=2-k*(i-1);
  if(i>6) hairs[i].position.y=2-k*(12-i);

}



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
group_cutie.add(group_head);





//upper body group
var group_upper = new THREE.Group();


// body

function createDressFold(r,y,s){
  let shape_body_dec=createShape(r,8);

  var extrudeSettings = {
    steps: 1,
    depth: 0,
    bevelEnabled:true,
    bevelThickness: .35,
    bevelSize: s,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  var geo_body_dec = new THREE.ExtrudeGeometry( shape_body_dec, extrudeSettings );
  var body_dec=new THREE.Mesh(geo_body_dec,mat_green);
  body_dec.rotation.x=Math.PI/2;
  body_dec.position.y=y;
  body_dec.castShadow=true;
  group_upper.add(body_dec);
}

createDressFold(.4,-.5,.15);
createDressFold(.5,-.95,.2);
createDressFold(.6,-1.4,.3);
createDressFold(.7,-1.85,.5);


// var geo_belly=new THREE.CylinderGeometry(2,1,.6,6);
// var belly=new THREE.Mesh(geo_belly,mat_green);
// belly.position.set(0,-1.9,0);
// belly.castShadow=true;
// group_upper.add(belly);

// arms
const armInitRotationX=Math.PI/8;
const armInitPositionY=-.4;
const armInitPositionZ=1.4;

// var geo_arm = new THREE.BoxGeometry( .5, .5, 2 );
const arm_length=2;
var geo_arm=new THREE.CylinderGeometry( .05, .1, arm_length,5);
var geo_hand=new THREE.IcosahedronGeometry(.15);

//left (arm + hand)
var group_leftArm=new THREE.Group();

var leftArm=new THREE.Mesh(geo_arm,mat_green);
leftArm.castShadow=true;
leftArm.rotation.x=Math.PI/2;
group_leftArm.add(leftArm);

var leftHand=new THREE.Mesh(geo_hand,mat_skin);
leftHand.position.z=1;
leftHand.castShadow=true;
group_leftArm.add(leftHand);


group_leftArm.rotation.x=armInitRotationX;
group_leftArm.position.set(
    0,
    armInitPositionY-Math.sin(group_leftArm.rotation.x),
    armInitPositionZ-arm_length/2+Math.cos(group_leftArm.rotation.x)
  );

group_upper.add(group_leftArm);

//right (arm + hand)
var group_rightArm=new THREE.Group();

var rightArm=new THREE.Mesh(geo_arm,mat_green);
rightArm.castShadow=true;
rightArm.rotation.x=-Math.PI/2;
group_rightArm.add(rightArm);

var rightHand=new THREE.Mesh(geo_hand,mat_skin);
rightHand.position.z=-1;
rightHand.castShadow=true;
group_rightArm.add(rightHand);

group_rightArm.rotation.x=-armInitRotationX;
group_rightArm.position.set(
    0,
    armInitPositionY-Math.sin(-group_rightArm.rotation.x),
    -armInitPositionZ+arm_length/2-Math.cos(-group_rightArm.rotation.x)
  );

group_upper.add(group_rightArm);

group_cutie.add(group_upper);



//buttom body
var group_bottom=new THREE.Group();
//legs
// var geo_leg = new THREE.BoxGeometry( .5, 1, .5 );
var geo_leg=new THREE.CylinderGeometry( .1, .05, 1,5);
var leftLeg=new THREE.Mesh(geo_leg,mat_skin);
leftLeg.position.set(0,-2.55,.25);
leftLeg.castShadow=true;
// leftLeg.visible=false;
group_bottom.add(leftLeg);

var rightLeg=new THREE.Mesh(geo_leg,mat_skin);
rightLeg.position.set(0,-2.55,-.25);
rightLeg.castShadow=true;
// rightLeg.visible=false;
group_bottom.add(rightLeg);

//shoes
// var geo_shoe=new THREE.BoxGeometry(.8,.3,.6);
var geo_shoe=new THREE.IcosahedronGeometry(.1);
var leftShoe=new THREE.Mesh(geo_shoe,mat_black);
leftShoe.position.set(0,-3.15,-.25); // box y=-3.05
leftShoe.castShadow=true;
group_bottom.add(leftShoe);

var rightShoe=new THREE.Mesh(geo_shoe,mat_black);
rightShoe.position.set(0,-3.15,.25);
rightShoe.castShadow=true;
group_bottom.add(rightShoe);
// group_bottom.scale.set(.5,1,.5);
group_cutie.add(group_bottom);


group_cutie.rotation.y=Math.PI/4;
scene.add(group_cutie);

//render
var render = function(){
	requestAnimationFrame( render );
  renderer.render( scene, camera );
  // group_cutie.angleY(Math.PI/120);

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
  var angleY=Math.PI*(mousePos.x-w/2)/w;
  var angleZ=-Math.PI*(mousePos.y-h/2)/h;

  //head
  group_head.rotation.y=.75*angleY;
  group_head.rotation.z=.5*angleZ;
  group_head.position.x=-.4*angleZ;

  //upperbody
  group_upper.rotation.y=.25*angleY;
  group_upper.rotation.z=.25*angleZ;
  group_upper.position.x=.25*angleZ;


  group_leftArm.rotation.x=-.7*angleZ+armInitRotationX;
  group_leftArm.position.set(
      0,
      armInitPositionY-Math.sin(group_leftArm.rotation.x),
      armInitPositionZ-arm_length/2+Math.cos(group_leftArm.rotation.x)
    );


  group_rightArm.rotation.x=.7*angleZ-armInitRotationX;
  group_rightArm.position.set(
    0,
    armInitPositionY-Math.sin(-group_rightArm.rotation.x),
    -armInitPositionZ+arm_length/2-Math.cos(-group_rightArm.rotation.x)
  );


  //bottom body
  group_bottom.rotation.y=.25*angleY;
  group_bottom.position.x=.5*angleZ;

}, false);

//clouds
// var clouds=new THREE.Group();
// var cloud=[];

// geo_cloud=new THREE.IcosahedronGeometry(1);
// cloud.push(new THREE.Mesh(geo_cloud,mat_white));
// cloud.push(new THREE.Mesh(geo_cloud,mat_white));
// cloud.push(new THREE.Mesh(geo_cloud,mat_white));
// cloud.push(new THREE.Mesh(geo_cloud,mat_white));


// for(var i=0;i<cloud.length;i++){
//   clouds.add(cloud[i]);
// }

// cloud[0].scale.set(1,1,2);
// cloud[1].scale.set(1,1.5,1.5);
// cloud[2].scale.set(1,1,1);
// cloud[3].scale.set(1,1,1.8);

// cloud[0].position.set(0,0,0);
// cloud[1].position.set(-.2,1,-.5);
// cloud[2].position.set(0,.8,-1.8);
// cloud[3].position.set(0,0,-1.8);

// cloud[0].rotation.set(Math.PI/12,0,Math.PI/8);
// cloud[1].rotation.set(Math.PI/8,0,Math.PI/3);
// cloud[2].rotation.set(0,0,-1.5);
// cloud[3].rotation.set(0,0,-1.8);

// clouds.position.z=-10;
// scene.add(clouds);



// text
var group_text=new THREE.Group();
var fontSize1=2;
var loader = new THREE.FontLoader();
loader.load( './js/Lato_Bold.json', function(font){

  //front
  // var text1=createText("Uh oh...",font,fontSize1);
  // var text1=createText("Keep calm",font,fontSize1);
  // text1.position.set(-10,-3.25,-10);
  // text1.rotation.set(0,Math.PI/3,0);
  // text1.castShadow=true;
  // text1.receiveShadow=true;
  // group_text.add(text1);

  var text2=createText("Take a breath...",font,fontSize1);
  text2.position.set(1,-3.25,-6);
  text2.rotation.set(0,Math.PI/3,0);
  text2.castShadow=true;
  text2.receiveShadow=true;
  group_text.add(text2);

} );

scene.add(group_text);

function createText(text,font,size){
  var textGeo = new THREE.TextGeometry( text, {
		font: font,
		size: size,
		height: .3, // thickness
    bevelEnabled: true,
		bevelThickness: .02,
		bevelSize: .02,
		bevelOffset: 0,
		bevelSegments: 3
	} );
  var textMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  var text=new THREE.Mesh(textGeo,textMat);
  return text;
}

function createShape(r,seg){
  let shape=new THREE.Shape();
  shape.moveTo( r*Math.cos(0),r*Math.sin(0) );
  for(var i=0;i<seg-1;i++){
    var theta=2*Math.PI/seg*(i+1);
    shape.lineTo(r*Math.cos(theta),r*Math.sin(theta))
  }
  return shape;
}