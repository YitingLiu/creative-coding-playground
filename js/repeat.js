//sketch 1
var s1=function(p){
  p.setup=function(){
    var w=window.innerWidth-100;
    var h=window.innerWidth/6;
    p.createCanvas(w,h);

    p.fill(0,50);
    p.noStroke();
    p.rectMode(p.CENTER);

    var dia=w/6-10;
    p.drawCircle1(w/12, h/ 2, dia);
    p.drawCircle2(w/ 4, h / 2, dia);
    p.drawCircle3(w*5/12, h / 2, dia);

    p.drawRect1(w *7/ 12, h /2, dia);
    p.drawRect2(w *3/ 4, h /2, dia);
    p.drawRect3(w *11/ 12, h /2, dia);
  };

  p.drawCircle1=function(x, y, d) {
    p.ellipse(x, y, d);
    if (d > 20) {
      d *= 0.5;
      p.drawCircle1(x, y, d);
    }
  };

  p.drawCircle2=function(x, y, d) {
    p.ellipse(x, y, d);
    if (d > 20) {
      d *= 0.5;
      p.drawCircle2(x - d / 2, y, d);
      p.drawCircle2(x + d / 2, y, d);
    }
  };

  p.drawCircle3=function(x, y, d) {
    p.ellipse(x, y, d);
    if (d > 20) {
      d *= 0.5;
      p.drawCircle3(x - d / 2, y, d);
      p.drawCircle3(x + d / 2, y, d);
      p.drawCircle3(x, y - d / 2, d);
      p.drawCircle3(x, y + d / 2, d);
    }
  };

  p.drawRect1=function(x,y,d){
    p.rect(x,y,d,d); 
    if (d > 20) {
      d *= 0.5;
      p.drawRect1(x, y, d);
    }
  }

  p.drawRect2=function(x, y, d) {
    p.rect(x, y, d,d);
    if (d > 20) {
      d *= 0.5;
      p.drawRect2(x - d / 2, y, d);
      p.drawRect2(x + d / 2, y, d);
    }
  }

  p.drawRect3=function(x, y, d) {
    p.rect(x, y, d,d);
    if (d > 20) {
      d *= 0.4;
      p.drawRect3(x - d / 2, y, d);
      p.drawRect3(x + d / 2, y, d);
      p.drawRect3(x, y - d / 2, d);
      p.drawRect3(x, y + d / 2, d);
    }
  }
}
var myp5 = new p5(s1, 'c1');