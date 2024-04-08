class Fish  {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 15;
    this.speed = 5;

    this.dx = 0;
    this.dy = 0;

    this.waterFriction = 0.96;
    this.stamina = 200;
    this.color = random(15, 60);
    this.saturation = 100;
    this.offset = floor(random(0, this.stamina-1));
    this.noMove = false;

    this.name = "";
  }

  drawSelf() {
    //no outline 
    noStroke(); 
    //get direction fish is facing 
    var angle = atan2(this.dy, this.dx); 
    //transform the fish to face the right direction 
    push(); 
    translate(this.x, this.y); 
    rotate(angle); 
    //draw an orange ellipse and triangle to represent the fish 
    fill(this.color, this.saturation, 100); 
    ellipse(0, 0, this.size * 1.25 * (this.speed / 5), this.size); 
    triangle(-this.size/2 * (this.speed / 5), 0, -this.size  * (this.speed / 5), -this.size/3, -this.size  * (this.speed / 5), this.size/3); 
    fill(0);
    ellipse(this.size/3 * (this.speed / 5), 0, this.size/4, this.size/4) 
    pop(); 
    //end transformation
  }

  mutate() {
    this.size *= 1 - (random(-2, 2)/10);
    this.speed *= 1 - (random(-2, 2)/10);
    this.stamina *= 1 - (random(-2, 2)/10);
    this.stamina = floor(this.stamina)
  }

  move() {
    if (frameCount % this.stamina == this.offset) {
      var vel_angle = random(0, 360);
      this.dx = cos(vel_angle) * this.speed;
      this.dy = sin(vel_angle) * this.speed;
    }

    if (this.x + this.dx < 0 || this.x + this.dx > width || this.y + this.dy < 0 || this.y + this.dy > height) {
      this.dx *= -1
      this.dy *= -1
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }

    this.dx *= this.waterFriction;
    this.dy *= this.waterFriction;
  }
}
