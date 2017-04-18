var music;
var fft;
var amp;
var j;
var spectrum1 = [];
var spectrum2 = [];
var spectrum3 = [];

var end = 1024;
var start = 0;
var startAngle = 270;

function preload() {
  music = loadSound('music/liangzhu.mp3');
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('c1');
  background(0);
  angleMode(DEGREES);
  music.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 1024);
}

function draw() {
  background(0, 50);
  if (spectrum3.length > 0) {
    drawPrevious3();
  }
  if (spectrum2.length > 0) {
    drawPrevious2();
  }
  if (spectrum1.length > 0) {
    drawPrevious1();
  }

  drawCurrent();
  // push();
  // for (var i = 0; i < spectrum.length; i++) {
  //   colorMode(HSB);
  //   stroke(map(i, 0, spectrum.length, 0, 360), 100, 100);
  //   var x = map(i, 0, spectrum.length, 0, width);
  //   line(x, spectrum[i - 1], x + width / spectrum.length, spectrum[i]);
  //   // var x = map(i, 0, spectrum.length, 0, width);
  //   // var h = map(spectrum[i], 0, 255, height, 0) - height;
  //   // rect(x, height, width / spectrum.length, h)

  // }
  // pop();
}

function drawCurrent() {
  var vol = amp.getLevel();
  var spectrum = fft.analyze();

  for (var i = start; i < end; i++) {

    push();
    translate(width / 2, height / 2 + 50);
    rotate(startAngle);

    var angle = 360 / (end - start);

    rotate(i * angle);



    colorMode(HSB);
    var h = map(i, start, end, 0, 360);
    stroke(h, 100, 100);
    var r = 50;
    if (i < end - 1) {
      var x1 = r + spectrum[i];
      var x2 = (r + spectrum[i + 1]) * cos(angle);
      var y2 = (r + spectrum[i + 1]) * sin(angle);
      line(x1, 0, x2, y2);
    } else {
      x1 = r + spectrum[i];
      x2 = (r + spectrum[start]) * cos(angle);
      y2 = (r + spectrum[start]) * sin(angle);
      line(x1, 0, x2, y2);
    }
    pop();

    spectrum1[i] = spectrum[i];

  }
}

function drawPrevious1() {

  for (var i = start; i < end; i++) {
    push();
    translate(width / 2, height / 2 + 50);
    rotate(startAngle);

    var angle = 360 / (end - start);

    rotate(i * angle);



    colorMode(HSB);
    var h = map(i, start, end, 0, 360);
    stroke(h, 100, 50);
    var r = 100;
    if (i < end - 1) {
      var x1 = r + spectrum1[i];
      var x2 = (r + spectrum1[i + 1]) * cos(angle);
      var y2 = (r + spectrum1[i + 1]) * sin(angle);
      line(x1, 0, x2, y2);
    } else {
      x1 = r + spectrum1[i];
      x2 = (r + spectrum1[start]) * cos(angle);
      y2 = (r + spectrum1[start]) * sin(angle);
      line(x1, 0, x2, y2);
    }
    pop();

    spectrum2[i] = spectrum1[i];

  }
}

function drawPrevious2() {

  for (var i = start; i < end; i++) {
    push();
    translate(width / 2, height / 2 + 50);
    rotate(startAngle);

    var angle = 360 / (end - start);

    rotate(i * angle);



    colorMode(HSB);
    var h = map(i, start, end, 0, 360);
    stroke(h, 100, 25);
    var r = 150;
    if (i < end - 1) {
      var x1 = r + spectrum2[i];
      var x2 = (r + spectrum2[i + 1]) * cos(angle);
      var y2 = (r + spectrum2[i + 1]) * sin(angle);
      line(x1, 0, x2, y2);
    } else {
      x1 = r + spectrum2[i];
      x2 = (r + spectrum2[start]) * cos(angle);
      y2 = (r + spectrum2[start]) * sin(angle);
      line(x1, 0, x2, y2);
    }
    pop();

    spectrum3[i] = spectrum2[i];

  }
}

function drawPrevious3() {

  for (var i = start; i < end; i++) {
    push();
    translate(width / 2, height / 2 + 50);
    rotate(startAngle);

    var angle = 360 / (end - start);

    rotate(i * angle);



    colorMode(HSB);
    var h = map(i, start, end, 0, 360);
    stroke(h, 100, 12.5);
    var r = 200;
    if (i < end - 1) {
      var x1 = r + spectrum3[i];
      var x2 = (r + spectrum3[i + 1]) * cos(angle);
      var y2 = (r + spectrum3[i + 1]) * sin(angle);
      line(x1, 0, x2, y2);
    } else {
      x1 = r + spectrum3[i];
      x2 = (r + spectrum3[start]) * cos(angle);
      y2 = (r + spectrum3[start]) * sin(angle);
      line(x1, 0, x2, y2);
    }
    pop();

  }
}