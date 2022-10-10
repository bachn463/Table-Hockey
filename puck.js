//subclass to the game object superclass
class Puck extends gameObjectCircle {
  constructor(xx, yy, dd, sp) {
    //calls superclass constructor
    super(xx, yy, dd, sp);

    //velocity(or change in pos over time) randomized to create different speeds/direction
    this.vel = createVector(sp * random(-1.4, 1.4), sp * random(-1.4, 1.4));

    //deceleration vector
    this.dcl = createVector(abs(this.vel.x / this.dclTime), abs(this.vel.y / this.dclTime));

    //array for particle effect
    this.part = [];
  }

  update() {
    //moves puck
    this.pos.add(this.vel);

    //deceleration equations
    if (this.vel.x > 0) this.vel.x -= this.dcl.x;
    else if (this.vel.x < 0) this.vel.x += this.dcl.x;
    if (this.vel.y > 0) this.vel.y -= this.dcl.y;
    else if (this.vel.y < 0) this.vel.y += this.dcl.y;

    //the velocity fluctuates around 0, so when it looks like the puck doesn't move, the velocity is set to 0;
    if (this.vel.x <= 0.0001 && this.vel.x >= -0.0001) this.vel.x = 0;
    if (this.vel.y <= 0.0001 && this.vel.y >= -0.0001) this.vel.y = 0;

    //runs through particle class functions and deletes elements when a particle has "disappeared"
    for (let i = 0; i < this.part.length; i++) {
      this.part[i].render();
      this.part[i].update();
      if (this.part[i].isClear()) this.part.splice(i, 1);
    }
  }

  reset() {
    super.reset();
    //calls superclass's reset function, while over-riding the velocity vector with random speeds
    this.vel.x = this.speedOrig * random(-1.2, 1.2);
    this.vel.y = this.speedOrig * random(-1.2, 1.2);
    this.dcl.x = abs(this.vel.x / this.dclTime);
    this.dcl.y = abs(this.vel.y / this.dclTime);
  }

  bounce() {
    //bounces off of walls
    if ((puck.pos.y + puck.rad) < (height / 3) + 3 || (puck.pos.y - puck.rad) > height * (2 / 3) - 3) {
      if (this.pos.x + this.rad > width - BORDER_WIDTH || this.pos.x - this.rad < BORDER_WIDTH) {
        this.particleEffect();
        this.vel.x *= -1;
      } else if (this.pos.y + this.rad > height - BORDER_WIDTH || this.pos.y - this.rad < BORDER_WIDTH) {
        this.particleEffect();
        this.vel.y *= -1;
      }
    }
  }

  collision(p) {
    super.collision(p);
    //calls the superclass's collision function, and adds the particleEffect function
    let distance = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
    if (distance <= this.rad + p.rad) {
      this.particleEffect();
    }
  }

  particleEffect() {
    //makes a small explosion/spark at point of contact
    if (this.vel.x != 0 && this.vel.y != 0) {
      for (let i = 0; i < 50; i++) {
        this.part.push(new Particle(this.pos.x, this.pos.y));
      }
    }
  }
}