var weatherUrlPart1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherUrlPart2 = '&units=metric&APPID=dc979c1f628c621b7f3515cafc32698e';
var city = 'New York';
var input;
var leaves = [];
var f = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  // angleMode(DEGREES);
  // colorMode(HSB);

  input = createInput('New York');
  input.position(20, 10);
  // for (var i = 0; i < 100; i++) {
  //   leaves.push(new leaf(createVector( randomGaussian(50, 70), randomGaussian(100, 100) )));
  //   leaves[i].display();
  // }

  getWeather();
  input.changed(getWeather);
}


function getWeather() {
  // f=0;
  // for (var i=0;i<100;i++){
  //   leaves[i]=new leaf(createVector(randomGaussian(50, 70), randomGaussian(100, 100)));

  // }
  city = input.value();
  var url = weatherUrlPart1 + city + weatherUrlPart2;
  loadJSON(url, drawWeather);

  function drawWeather(data) {
    // console.log(data);
    // console.log(leaves.length);
    // console.log(data.wind.speed);
    f = data.wind.speed;
  }
}

function draw() {
  leaves.push(new leaf(createVector(randomGaussian(20, 70), randomGaussian(window.innerHeight/2, 120))));
  background(255);
  // console.log(f);

  for (var i = 0; i < leaves.length; i++) {
    leaves[i].applyforce(map(f,0,20,0,5));
    // if(leaves[i].vel.x>0 && f==0){    
    //   leaves[i].applyforce(-1);
    // }
    leaves[i].update();
    leaves[i].display();
    if(leaves[i].isDead()==true){
      leaves.splice(i, 1);
    }
  }
  console.log(leaves.length);

}