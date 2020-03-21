var leaf = function(pos) {
  this.pos = pos;
  // this.r = r;
  this.size = random(0.5, 3)
  this.acc = 0;
  this.vel=createVector(random(0,8),0);
  this.offset = random(1000);

  this.c =random(100);

  this.display = function() {
    push();
    // console.log(this.acc);

    translate(this.pos.x, this.pos.y);
    // r += noise(this.offset)-0.5;
    // rotate(r);
    noStroke();
    fill(0,this.c);
    ellipse(0, 0, 30 * this.size, 30 * this.size);
    pop();
  }

  this.applyforce = function(f) {
    this.acc = f;
    this.vel.x+=this.acc;
  }
  
  this.update=function(){
    if (this.acc != 0) {
      this.pos.x += this.vel.x;
      this.pos.y += 10*(noise(this.offset)-0.2);
      this.offset += 0.01;
    } else{
      // this.pos.x += random(-1,1);
      this.pos.y += (noise(this.offset)-0.5);
      this.offset += 0.01;
    }
  }
  this.isDead=function(){
    if(this.pos.x>window.innerWidth){
      return true;
      // console.log(true);
    }else if(this.pos.y>window.innerHeight){
      return true;
    }else{
      return false;
    }
    
  }
}