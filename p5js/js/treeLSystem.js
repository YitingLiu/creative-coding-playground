var lsys;
var turtle;

function setup() {
  var myCanvas = createCanvas(window.innerWidth, window.innerHeight - 100);
  myCanvas.parent("c1");
  var ruleset = [];
  ruleset[0] = new Rule('F', "FF+[+F-F-F]-[-F+F+F]");

  lsys = new LSystem("F", ruleset); // start, rule

  //render
  turtle = new Turtle(lsys.sentence, 50, PI / 6) // a sentence, a starting length, an angle fo rotation
  frameRate(1);
}

var a = 100;

function draw() {
  background(255);

  // for (var g = 0; g < 2; g++) {
  if (lsys.gen < 5) {
    a *= 0.8;

    lsys.generate();
    turtle.setToDo(lsys.sentence);
    turtle.changeLen(0.65);

    print(lsys.gen); ///////////////////
    print(lsys.sentence); ///////////////////
  }
  turtle.display();
  stroke(0, a);

}

Rule = function(a, b) {
  this.a = a;
  this.b = b;

  this.getA = function() {
    return this.a;
  }

  this.getB = function() {
    return this.b;
  }
}

Turtle = function(stns, len, theta) {
  this.stns = stns;
  this.len = len;
  this.theta = theta;

  this.display = function() {
    translate(width / 2, height);
    rotate(-PI / 2);
    for (var i = 0; i < this.stns.length; i++) {
      var c = this.stns.charAt(i);
      if (c == "F") {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
      } else if (c == "+") {
        rotate(randomGaussian(theta, 0.05));
      } else if (c == "-") {
        rotate(randomGaussian(-theta, 0.05));
      } else if (c == "[") {
        push();
      } else if (c == "]") {
        pop();
      }
    }
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