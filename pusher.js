//pusher class is a subclass to game object circle
class Pusher extends gameObjectCircle {
  constructor(xx, yy, dd, sp) {
    super(xx, yy, dd, sp);
  }

  update(u, d, l, r) {
    //based on numeric values given to key codes in JS, you can customize key controls
    if (keyIsDown(u)) this.pos.y -= this.vel.y;
    if (keyIsDown(d)) this.pos.y += this.vel.y;
    if (keyIsDown(l)) this.pos.x -= this.vel.x;
    if (keyIsDown(r)) this.pos.x += this.vel.x;

    //these are used in the superclass's collision logical statements
    this.up = u;
    this.down = d;
    this.left = l;
    this.right = r;
  }
}