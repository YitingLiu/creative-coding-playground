function setup() {
  var myCanvas=createCanvas(window.innerWidth-100,window.innerWidth/3 *2);
  myCanvas.parent('canvasContainer1');
  myCanvas.id('sketch1');  

  fill(0,50);
  noStroke();
  rectMode(CENTER)

  drawCircle1(width/6, height / 4, width/3);
  drawCircle2(width / 2, height / 4, width/3);
  drawCircle3(width*5/6, height / 4, width/3);

  drawRect1(width / 6, height *3/4, width/3);
  drawRect2(width / 2, height *3/4, width/3);
  drawRect3(width *5/ 6, height *3/4, width/3);

}

function draw() {}

function drawCircle1(x, y, d) {
  ellipse(x, y, d);
  if (d > 20) {
    d *= 0.5;
    drawCircle1(x, y, d);
  }
}

function drawCircle2(x, y, d) {
  ellipse(x, y, d);
  if (d > 20) {
    d *= 0.5;
    drawCircle2(x - d / 2, y, d);
    drawCircle2(x + d / 2, y, d);
  }
}

function drawCircle3(x, y, d) {
  ellipse(x, y, d);
  if (d > 20) {
    d *= 0.5;
    drawCircle3(x - d / 2, y, d);
    drawCircle3(x + d / 2, y, d);
    drawCircle3(x, y - d / 2, d);
    drawCircle3(x, y + d / 2, d);
  }
}

function drawRect1(x, y, d) {
  rect(x, y, d,d);
  if (d > 20) {
    d *= 0.5;
    drawRect1(x, y, d);
  }
}

function drawRect2(x, y, d) {
  rect(x, y, d,d);
  if (d > 20) {
    d *= 0.5;
    drawRect2(x - d / 2, y, d);
    drawRect2(x + d / 2, y, d);
  }
}

function drawRect3(x, y, d) {
  rect(x, y, d,d);
  if (d > 20) {
    d *= 0.4;
    drawRect3(x - d / 2, y, d);
    drawRect3(x + d / 2, y, d);
    drawRect3(x, y - d / 2, d);
    drawRect3(x, y + d / 2, d);
  }
}