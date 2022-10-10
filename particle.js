class Particle {
  constructor(xx, yy) {
    //position and velocity vectors
    this.pos = createVector(xx, yy);
    this.vel = createVector(5 * random(-1.4, 1.4), 5 * random(-1.4, 1.4));
    
    //rgba values, alpha determines transparency
    this.alpha = 250;
    this.red = random(200, 255);
    this.green = random(150);
    
    //side length of rectangle
    this.sideLength = 3;
  }

  render() {
    //makes each object
    fill(this.red, this.green, 0, this.alpha);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.sideLength, this.sideLength);
  }

  update() {
    //short spark effect caused by random direction and continuous decreasing of the alpha value
    this.pos.add(this.vel);
    if (this.alpha >= 0) {
      this.alpha -= 25;
    }
  }
  isClear() {
    //checking if the object has disappeard
    if(this.alpha <= 0) return true;
    return false;
  }
}