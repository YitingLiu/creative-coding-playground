var capture;
var posRow = [];
var steps = 40;
var stepx;
var stepy;
var w = 640;
var h = 480;

function preload() {
  capture = loadImage("img/bridge.jpg");
}

function setup() {

  w = capture.width;
  h = capture.height;
  var myCanvas=createCanvas(w * 2, h );
  myCanvas.parent("c1");
  frameRate(5);

  image(capture, 0, 0, w / 2, h / 2);

  // capture = createCapture(VIDEO);
  // capture.size(w, h);
  // capture.hide();


  noStroke();

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

        //average once
        fill(currentColor[0],currentColor[1],currentColor[2]);
        quad(current[0].x / 2 , current[0].y / 2+h/2,
          current[1].x / 2 , current[1].y / 2+h/2,
          current[2].x / 2 , current[2].y / 2+h/2,
          current[3].x / 2 , current[3].y / 2+h/2);

        // var avg1=map(currentColor[0] + currentColor[1] + currentColor[2], 0, 764, 20, 0)
        // textSize(avg1);
        // text("A", current[0].x / 2 + w, current[0].y / 2);

        // fill(currentColor[0],currentColor[1],currentColor[2],avg1);
        // rect(current[0].x / 2 + w * 3 / 2, current[0].y/2, avg1/2, avg1/2);        


        // average twice
        var rd=(upColor[0]+downColor[0]+leftColor[0]+rightColor[0])/4;
        var gn=(upColor[1]+downColor[1]+leftColor[1]+rightColor[1])/4;
        var bl=(upColor[2]+downColor[2]+leftColor[2]+rightColor[2])/4;
        
        fill(rd,gn,bl);
        quad(current[0].x / 2 + w / 2, current[0].y / 2+h/2,
          current[1].x / 2 + w / 2, current[1].y / 2+h/2,
          current[2].x / 2 + w / 2, current[2].y / 2+h/2,
          current[3].x / 2 + w / 2, current[3].y / 2+h/2);

        var avg2=map(rd + gn + bl, 0, 764, 20, 0)
        textSize(avg2);
        text("A", current[0].x / 2 + w, current[0].y / 2+h/2);

        fill(rd, gn, bl, avg2);
        rect(current[0].x / 2 + w * 3 / 2, current[0].y/2+h/2, avg2/2, avg2/2);
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
  var col=[];
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