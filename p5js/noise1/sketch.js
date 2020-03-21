var off = [0.0, 35.3, 3.5, 90.5];
var peakX;
var peakHeight = [-50, -20, -30, -60]; //+ valley / - peak
var colors = [];
var noiseScale = 50;

//animate
var offs = [];

function setup() {
  var myCanvas=createCanvas(windowWidth, 500);
  myCanvas.parent("c1");
  peakX = [width / 2, width * 2 / 3, width / 5, width / 4];

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
  for (var i = 0; i < 4; i++) {
    var t = [];
    var offset = random(1000);
    for (var x = 0; x < width; x++) {
      t.push(noise(offset));
      offset += 0.01;
    }
    offs.push(t);
  }
}

function draw() {
  background(205, 200, 194, 1.00);
  off.forEach(function(e, i) {
    for (var x = 0; x < width; x++) {
      var y = getPosY(x, peakX[i], peakHeight[i], 100 * (i + 1), e);
      e += 0.01;
      stroke(colors[i]);
      
      //not animate
      // line(x, y, x, height);
      
      //animate
      line(x, y + 70 * noise(offs[i][x]), x, height);
      offs[i][x] += 0.01;
    }
  });
}


//x: current position x
//px: peak position x
//poff:peak height, + valley / - peak
//startoff: start position height
//noise: noiseoff
function getPosY(x, px, poff, startoff, noiseoff) {
  var yoff = 2 * map(abs(px - x), 0, width / 2, poff, 0);
  var noiseVal = noise(noiseoff);
  var y = noiseVal * noiseScale + startoff + yoff;
  return y;
}