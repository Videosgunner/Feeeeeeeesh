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

    this.name = null;
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
    //draw an ellipse and triangle to represent the fish 
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
    }

    for (var wall of walllist) {
      if ((this.y+this.dy - (wall.a * (this.x + this.dx) + wall.b)) / (this.y - (wall.a * (this.x) + wall.b)) <= 0 && ((wall.x1 <= this.x && wall.x2 >= this.x) || (wall.x2 <= this.x && wall.x1 >= this.x) )) {
        var thisangle = atan2(this.dy, this.dx)
        var newAngle = 2 * atan2(wall.y2-wall.y1,wall.x2-wall.x1) - thisangle;
        var currentSpeed = sqrt(this.dx**2 + this.dy**2)
        this.dy = sin(newAngle) * currentSpeed;
        this.dx = cos(newAngle) * currentSpeed;
        break
      } else if (wall.x1 == wall.x2 && (this.x + this.dx - wall.x1) / (this.x - wall.x1) <=0) {
        var thisangle = atan2(this.dy, this.dx)
        var newAngle = PI - thisangle;
        var currentSpeed = sqrt(this.dx**2 + this.dy**2)
        this.dy = sin(newAngle) * currentSpeed;
        this.dx = cos(newAngle) * currentSpeed;
        break
      }
    }

    this.x += this.dx;
    this.y += this.dy;
    
    this.dx *= this.waterFriction;
    this.dy *= this.waterFriction;
  }
}

class Wall {
  constructor(x1,y1,x2,y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.a = (y2 - y1) / (x2 - x1);
    this.b = y1 - this.a * x1;
  }

  drawSelf() {
    push();
    stroke(random(0,360),100,100);
    strokeWeight(2)
    line(this.x1, this.y1, this.x2, this.y2)
    pop();
  }
}
