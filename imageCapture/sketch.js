var capture;
var posRow = [];
var steps = 40;
var stepx;
var stepy;
var w = 640;
var h = 480;

function setup() {
  var myCanvas=createCanvas(w * 2, h);
  myCanvas.parent("c1");
  capture = createCapture(VIDEO);
  capture.size(w / 2, h / 2);
  capture.hide();

  frameRate(5);



  stepx = w / steps;
  stepy = h / steps;
  for (var j = 0; j < steps + 1; j++) {
    var currentRow = [];
    for (var i = 0; i < steps + 1; i++) {
      var p = new p5.Vector(stepx * i + stepx / 6 * random(-1, 1), stepy * j + stepy / 6 * random(-1, 1));
      currentRow.push(p);
    }
    posRow.push(currentRow);
  }
}


function draw() {

  background(255,20);
  image(capture, w + 10, 10, w / 2 - 20, h / 2 - 20);

  capture.loadPixels();

  if (capture.pixels.length > 0) {

    for (var j = 1; j < posRow.length - 2; j++) {
      for (var i = 1; i < posRow[j].length - 2; i++) {

        var current = getCorners(j, i); //array[pointA, pointB, pointC,pointD]
        var up = getCorners(j - 1, i);
        var down = getCorners(j + 1, i);
        var left = getCorners(j, i - 1);
        var right = getCorners(j, i + 1);

        var currentColor = getColor(current); // array [r,g,b]
        var upColor = getColor(up); // array [r,g,b]
        var downColor = getColor(down);
        var leftColor = getColor(left);
        var rightColor = getColor(right);


        // average twice
        var rd = (upColor[0] + downColor[0] + leftColor[0] + rightColor[0]) / 4;
        var gn = (upColor[1] + downColor[1] + leftColor[1] + rightColor[1]) / 4;
        var bl = (upColor[2] + downColor[2] + leftColor[2] + rightColor[2]) / 4;


        // image - lines
        
        var yoff = map(currentColor[0]+currentColor[1]+currentColor[2], 0, 900, -15, 15);
        var yoff_right = map(rightColor[0]+rightColor[1]+rightColor[2], 0, 900, -15, 15);

        stroke(rd, gn, bl);
        strokeWeight(yoff/2);
        line(current[0].x/2+ w *1.5, stepy * j/2+yoff, current[1].x/2 + w*1.5, stepy * j/2+yoff_right)



        noStroke();
        fill(rd, gn, bl);

        quad(current[0].x, current[0].y,
          current[1].x, current[1].y,
          current[2].x, current[2].y,
          current[3].x, current[3].y);

        var avg2 = map(rd + gn + bl, 0, 764, 0, 20)
        textSize(avg2);
        text("A", current[0].x / 2 + w, current[0].y / 2 + h / 2);
        
        var avg3 = map(rd + gn + bl, 0, 764, 20, 0)
        // fill(rd, gn, bl, avg3);
        rect(current[0].x / 2 + w * 3 / 2, current[0].y / 2 + h / 2, avg3 / 2, avg3 / 2);
      }
    }
  }
}

// pixel at (x,y): pixels[4*w*y+4*x]
function getPixel(pos) {
  return 4 * w * round(pos.y) + 4 * round(pos.x);
}


// red: k=0;
// green: k=1;
// blue: k=2;
// alpha: k=3;
function getAvg(pos, k) {
  var sum = 0;
  pos.forEach(function(e) {
    sum += capture.pixels[getPixel(e) + k]
  });
  return sum / pos.length;
}

function getColor(c) {
  var col = [];
  col.push(getAvg(c, 0));
  col.push(getAvg(c, 1));
  col.push(getAvg(c, 2));
  return col;
}

function getCorners(m, n) {
  var cur = [];
  cur.push(posRow[m][n]);
  cur.push(posRow[m][n + 1]);
  cur.push(posRow[m + 1][n + 1]);
  cur.push(posRow[m + 1][n]);
  return cur;
}