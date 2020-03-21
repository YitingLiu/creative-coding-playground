// The Nature of Code
// Yiting Liu
// noise();  clouds

var xoff = 0;
var yoff = 100;
var zoff = 10000;

function setup() {
  var myCanvas=createCanvas(200, 100);
  myCanvas.parent("c1");
  noiseDetail(4, 0.5);
  frameRate(5);
}

function draw() {
  loadPixels();
  for (var i = 0; i < width * pixelDensity(); i++) {
    for (var j = 0; j < height * 4 * pixelDensity(); j++) {
      var idx = 4 * (i + j * width);
      var c = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
      pixels[idx] = c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = 255;
      pixels[idx + 3] = 255;
      yoff += 0.01;
    }
    xoff += 0.01;
    yoff = 100;
  }
  zoff += 0.01;
  updatePixels();
}