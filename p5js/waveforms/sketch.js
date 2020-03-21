var music;
var fft;
var amp;
var j;
var waveforms = [];
var end = 1024;
var start = 0;
var times = 4;
var h = 0;
var posX = [];
var posY = [];


function preload() {
  music = loadSound('music/IntoEther.mp3');
}

function setup() {
  var myCanvas=createCanvas(windowWidth, windowHeight-100);
  myCanvas.parent('c1');

  background(0);
  angleMode(DEGREES);
  noStroke();
  music.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 1024);
  for (var i = 0; i < times; i++) {
    waveforms[i] = 0;
  }
}

function draw() {
  background(0);
  h = frameCount % 360;
  var vol = amp.getLevel();
  var waveform = fft.waveform();
  
  
  // amplify
  for (var i = 0; i < waveform.length; i++) {
    waveform[i] *= 100;
  }
  
  
  for (var i = times; i > 0; i--) {
    waveforms[i] = waveforms[i - 1];
  }
  waveforms[0] = waveform;
  var r = 0;
  var b = 12.5 / 4;
  for (var j = 0; j < waveforms.length; j++) {
    b = b * 2; // 12.5,25,50,100
    r = 300 - 15 * j * j;
    display(waveforms[waveforms.length - j - 1], r, b);
  }

}

function display(_waveform, _r, _b) {
  push();
  colorMode(HSB);
  translate(width / 2, height / 2);

  var angle = 360 / (end - start);
  var r = _r;

  for (var i = start; i < end; i++) {
    if (posX.length == 0) {
      posX.push((r + _waveform[i]) * cos(angle * i));
      posY.push((r + _waveform[i]) * sin(angle * i));
    } else {
      posX[i] = (r + _waveform[i]) * cos(angle * i);
      posY[i] = (r + _waveform[i]) * sin(angle * i);
    }
  }

  fill(h, 100, _b);
  beginShape();
  for (var i = start; i < end; i++) {

    vertex(posX[i], posY[i]);
  }

  endShape(CLOSE);
  pop();

}