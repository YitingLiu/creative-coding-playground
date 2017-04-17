var lsys;
var turtle;
var xoff;
var yoff;

function setup() {
  var myCanvas=createCanvas(600, 500);
  myCanvas.parent("c1");
  xoff = random(10);
  yoff = random(10, 100);
  var ruleset = [];
  ruleset[0] = new Rule('F', "FF+[+F-G-F]-[-F+F+G]");
  lsys = new LSystem("F", ruleset); // start, rule

  //render
    turtle=new Turtle(lsys.sentence, 50);  // a sentence, a starting length
  // turtle = new Turtle(lsys.sentence, 40, PI / 6); // a sentence, a starting length, an angle fo rotation
  
    stroke(255);

}

var a = 100;

function draw() {
  background(55);
strokeWeight(1.5);

//draw the moon
  push();
  noStroke();
  fill(234, 231, 198, 255);
  ellipse(width*3/4, height/4, height/4);
  pop();

  xoff += 0.005;
  yoff += 0.005;

  if (lsys.gen < 4) {
    a *= 0.8;
    lsys.generate();
    turtle.setToDo(lsys.sentence);
    turtle.changeLen(0.65);
    // print(lsys.gen); ///////////////////
    // print(lsys.sentence); ///////////////////
  }
  turtle.display(width/5);
  stroke(255, a);
}

Rule=function(a,b){
  this.a=a;
  this.b=b;
  
  this.getA=function(){
    return this.a;
  }
  
  this.getB=function(){
    return this.b;
  }
}

Turtle = function(stns, len) {
  this.stns = stns;
  this.len = len;

  this.display = function(x) {
    push();
    translate(x, height);
    rotate(-PI / 2);
    for (var i = 0; i < this.stns.length; i++) {
      var c = this.stns.charAt(i);
      if (c == "F") {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
      } else if (c == "G") {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
        ellipse(0,0,2);
      } else if (c == "+") {
        rotate(map(noise(xoff), 0, 1, 0.1, 0.6));
      } else if (c == "-") {
        rotate(-map(noise(xoff), 0, 1, 0.1, 0.6));
      } else if (c == "[") {
        push();
      } else if (c == "]") {
        pop();
      }
    }
    pop();
  }


  this.setToDo = function(s) {
    this.stns = s;
  };

  this.changeLen = function(percent) {
    this.len *= percent;
  }
}

function LSystem(start, ruleset) {
  this.sentence = start;
  this.ruleset = ruleset;
  this.gen = 0;

  this.generate = function() {
    var next = '';
    // chech every Char
    for (var i = 0; i < this.sentence.length; i++) {
      var current = this.sentence.charAt(i);
      var replace;

      //check every rule
      for (var j = 0; j < ruleset.length; j++) {
        if (current == this.ruleset[j].getA()) {
          replace = this.ruleset[j].getB();
          break;
        }
        replace = current;

      }
      next += replace;
    }
    this.sentence = next;
    this.gen++;
  }
}