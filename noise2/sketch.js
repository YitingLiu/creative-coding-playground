var off = 23.5;
var off1 = 43.2;
var off2 = 54.7;
var peakX;
var peakX1;
var peakX2;
var peakHeight = [-16, 16, -10.5, 9, -4, 6.4, -5, 8.12, -6.2]; //- valley / + peak
var peakHeight1 = [-16, 17.75, -10.5, 10, -11]; //- valley / + peak
var peakHeight2 = [-16, 17.9, -10.5, 10, -11]; //- valley / + peak
var colors = [];
var noiseScale = 150;

var midoff = 643;


function setup() {
  var myCanvas=createCanvas(windowWidth, 500);
  myCanvas.parent("c1");  peakX = [0.16, 0.25, 0.33, 0.39, 0.42, 0.46, 0.51, 0.62, 0.7];
  peakX.forEach(function(e) {
    e = e * width;
  });
  peakX1 = [0.16, 0.25, 0.33, 0.39, 0.42];
  peakX1.forEach(function(e) {
    e = (e + random(-0.1, 0.1)) * width;
  });
  peakX2 = [0.42, 0.46, 0.51, 0.62, 0.7];
  peakX2.forEach(function(e) {
    e = (e + random(-0.1, 0.1)) * width;
  });
  // noLoop();
  frameRate(1);
  colorMode(RGB, 255, 255, 255, 1);
  var c = color(164, 168, 164, 1.00);
  colors.push(c);
  c = color(120, 132, 132, 1.00);
  colors.push(c);
  c = color(67, 90, 94, 1.00);
  colors.push(c);
  c = color(47, 58, 49, 1.00);
  colors.push(c);

  //animate
  // for (var i = 0; i < 4; i++) {
  //   var t = [];
  //   var offset = random(1000);
  //   for (var x = 0; x < width; x++) {
  //     t.push(noise(offset));
  //     offset += 0.01;
  //   }
  //   offs.push(t);
  // }
}

function draw() {
  // background(205, 200, 194, 1.00);


  //water
  for (var y = height / 2; y < height + 1; y++) {
    var water_r = map(y, height / 2, height, 244, 118);
    var water_g = map(y, height / 2, height, 214, 108);
    var water_b = map(y, height / 2, height, 220, 113);
    stroke(water_r, water_g, water_b);
    line(0, y, width, y);

  }


  for (var x = 0; x < width + 1; x++) {
    var offsetY = getPosY(x, peakX, peakHeight, off);
    off += 0.01;

    if (offsetY < 0) offsetY = 0;

    //sky
    var r = map(x, 0, width, 238, 226);
    var g = map(x, 0, width, 205, 172);
    var b = map(x, 0, width, 172, 158);
    stroke(r, g, b);
    line(x, height / 2 - offsetY, x, 0);

    //mountain
    stroke(93, 75, 80, 1);
    line(x, height / 2 - offsetY, x, height / 2 + 5 * noise(midoff));

    //reflection
    stroke(115, 91, 90, 1);

    if (x % 5 === 0) {
      line(x, height / 2 + offsetY, x, height / 2 + 5 * noise(midoff));
    } else {
      line(x, height / 2 + random(offsetY), x, height / 2 + 5 * noise(midoff));

    }
    // midoff += 0.1;
  }

  for (x = 0; x < width + 1; x++) {
    offsetY = getPosY(x, peakX1, peakHeight1, off1);
    off1 += 0.01;

    if (offsetY < 0) offsetY = 0;

    //mountain
    stroke(93, 75, 80, 0.3);
    line(x, height / 2 - offsetY, x, height / 2 + 5 * noise(midoff));

    //reflection
    stroke(115, 91, 90, .3);

    if (x % 5 === 0) {
      line(x, height / 2 + offsetY, x, height / 2 + 5 * noise(midoff));
    } else {
      line(x, height / 2 + random(offsetY), x, height / 2 + 5 * noise(midoff));

    }
  }

  for (x = 0; x < width + 1; x++) {
    offsetY = getPosY(x, peakX2, peakHeight2, off2);
    off2 += 0.01;

    if (offsetY < 0) offsetY = 0;

    //mountain
    stroke(93, 75, 80, 0.2);
    line(x, height / 2 - offsetY, x, height / 2 + 5 * noise(midoff));

    //reflection
    stroke(115, 91, 90, .2);

    if (x % 5 === 0) {
      line(x, height / 2 + offsetY, x, height / 2 + 5 * noise(midoff));
    } else {
      line(x, height / 2 + random(offsetY), x, height / 2 + 5 * noise(midoff));

    }
    midoff += 0.1;
  }

}


//x: current position x
//px: [] peak positions x
//poff: [] peak heights, + valley / - peak
//noise: noiseoff
function getPosY(x, px, poff, noiseoff) {
  var y = 0;
  for (var i = 0; i < px.length; i++) {

    if (x < px[i]) {
      var yoff = map(px[i] - x, 0, px[i], pow(poff[i], 3), 0);
    } else {
      var yoff = map(x - px[i], 0, width - px[i], pow(poff[i], 3), 0);
    }
    y += yoff;


    // if (poff[i] >= 0) {
    //   y += yoff;
    // } else {
    //   y -= yoff;
    // }

  }
  var noiseVal = noise(noiseoff);
  y += noiseVal * noiseScale;
  return y;
}