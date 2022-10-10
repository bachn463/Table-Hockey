class gameObjectCircle {
  constructor(xx, yy, dd, sp) {
    //orig variables help reset positions and others
    //position vector
    this.pos = createVector(xx, yy);
    this.posOrig = createVector(xx, yy);
    
    //uniform velocity vector
    this.vel = createVector(sp, sp);
    this.speedOrig = sp;
    
    //how long it takes, in frames, for to decelerate to 0(60 fps)
    this.dclTime = 650;
    
    //radius and diameter
    this.dia = dd;
    this.rad = dd / 2;
    
    let up, down, left, right;
    
  }
  
  render(colorPrimary, colorSecondary, scl) {
    //creates objects
    noStroke();
    fill(colorPrimary);
    ellipse(this.pos.x, this.pos.y, this.dia, this.dia); 
    fill(colorSecondary);
    ellipse(this.pos.x, this.pos.y, this.dia * scl, this.dia * scl);
  }
  
  reset() {
    //resets positions and values
    this.pos.x = this.posOrig.x;
    this.pos.y = this.posOrig.y
    this.vel.x = this.speedOrig;
    this.vel.y = this.speedOrig;
  }
  
  limit(minX, maxX, minY, maxY) {
    //limits all moving objects within a given area, which is inputted via the parameter
    this.pos.x = constrain(this.pos.x, minX + this.rad, maxX - this.rad);
    this.pos.y = constrain(this.pos.y, minY + this.rad, maxY - this.rad);
  }
  
  collision(p) {
    let distance = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
    //direction is a vector that creates an actual "vector" by storing the difference of coordinate values, thereby giving the object a specified direction dependent on where it gets hit
    this.dir = createVector(this.pos.x - p.pos.x, this.pos.y - p.pos.y);
    //using pythagorean theorem to find direction and magnitude of the puck, allowing us to scale the new speed 
    this.speedInit = sqrt(sq(this.vel.x) + sq(this.vel.y));
    this.speedNew = sqrt(sq(this.dir.x) + sq(this.dir.y));
    //original collision conditional statement
    if (distance <= this.rad + p.rad) {
      if (keyIsDown(p.up) || keyIsDown(p.down) || keyIsDown(p.left) || keyIsDown(p.right)) {
        //collision if the object p is moving
        this.vel = this.dir.mult(p.vel.x*sqrt(3) / this.speedNew);
        this.dcl.x = abs(this.vel.x / this.dclTime);
        this.dcl.y = abs(this.vel.y / this.dclTime);
      } else {
        //collision if the object p isnt moving
        this.vel = this.dir.mult(this.speedInit / this.speedNew);
        this.dcl.x = abs(this.vel.x / this.dclTime);
        this.dcl.y = abs(this.vel.y / this.dclTime);
      }
    }
  }
}