var s2=function(p){
  var w;
  p.setup=function(){
    w=window.innerWidth/2-50;
    p.createCanvas(w, w);
    p.translate(p.width / 2, p.height);
    p.branch(w/4);
    p.frameRate(0.5);
  };

  p.windowResized=function() {
    p.setup();
  };

  p.draw=function(){
    p.setup(); 
  }

  p.branch=function(len){
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    len *= 0.7;
    if (len > 2) {
      var n = p.floor(p.random(1.5, 2.5));
      for (var i = 0; i < n; i++) {
        p.push();
        p.rotate(p.random(-p.PI / 3, p.PI / 3));
        p.branch(len);
        p.pop();
      }
    } 
  };

  // p.mousePressed=function() {
  //   p.background(255);
  //   p.translate(p.width / 2, p.height);
  //   p.branch(w/4);
  // }
}
var myp5 = new p5(s2, 'c2');


var s3=function(p){
    var w;
  p.setup=function(){
    w=window.innerWidth/2-50;
    p.createCanvas(w, w);    p.push();
    p.translate(p.width / 2, p.height);
    p.branch(w/4);
    p.pop();
    p.frameRate(0.5);
  }
  p.windowResized=function() {
    p.setup();
  };

  p.draw=function() {
    p.setup();
  }

  p.branch=function(len){
    p.stroke(0, len);
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    len *= 0.7;
    if (len > 3) {
      var n = p.floor(p.random(1.5, 5.5));
      for (var i = 0; i < n; i++) {
        p.push();
        p.rotate(p.randomGaussian(0,0.5));
        p.branch(len);
        p.pop();
      }
    }
  }
}

var myp5 = new p5(s3, 'c3');