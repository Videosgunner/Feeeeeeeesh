var target = 0;
var mode = null;
const start = Date.now();

fishlist = []

function setup() {
  var main = createCanvas(windowWidth - 220, windowHeight);
  main.position(220,0);
  colorMode(HSB, 100);

  while (fishlist.length < 5) {
    fish = new Fish(random(0, width), random(0, height));
    fish.mutate();
    fishlist.push(fish);
  }

}

function draw() {
  resizeCanvas(windowWidth - 220, windowHeight);
  background(60+(cos(frameCount/200)*2), 70, 70);
  for (var eachfish of fishlist) {
    eachfish.drawSelf();
    if (eachfish.noMove == false) {
      eachfish.move();
    }
  }

  for (var fish of fishlist) {
    if (fish.x - ((fish.size * fish.speed / 5) / 2) < mouseX && fish.x + ((fish.size * fish.speed / 5) / 2) > mouseX && fish.y - fish.size / 2 < mouseY && fish.y + fish.size / 2 > mouseY) {
      fish.saturation = 50;
      if (fish.name != null) {
        push();
        fill(0,0,100);
        textAlign(LEFT,BOTTOM)
        text(fish.name,mouseX,mouseY)
        pop();
      }
    } else {
      fish.saturation = 100;
    }
  }

  if (target != 0) {
    target.noMove = true;
    target.x = mouseX;
    target.y = mouseY;
  }

  

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    push();
    translate(mouseX, mouseY);
    noCursor();
    stroke(3);
    fill(0, 0, 100);
    triangle(0,0,4,10,10,4);
    pop();
  }
  
  switch (mode) {
    case 0:
      if (target == 0) {
        document.getElementById("contentP").innerHTML = "No Fish Selected."
      } else {
        document.getElementById("contentP").innerHTML = "Size: " + target.size + "<br>Speed: " + target.speed + "<br>Color: " + target.color;
      }
      break
    case 2:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        document.getElementById("contentP").innerHTML = "Position: (" + mouseX + ", " + floor(mouseY) + ")<br>Time: " + str(floor((Date.now()-start)/10)/100);
        
      } else {
        document.getElementById("contentP").innerHTML = "Position: NA<br>Time: " + str(floor((Date.now()-start)/10)/100);
      }
      break
    case 847:
      document.getElementById("contentP").innerHTML = "Fish with SPICE.";
      break
    default:
      document.getElementById("contentP").innerHTML = "";
  }

}

function mouseDragged() {
  for (var fish of fishlist) {
    if (fish.x - ((fish.size * fish.speed / 5) / 2) < mouseX && fish.x + ((fish.size * fish.speed / 5) / 2) > mouseX && fish.y - fish.size / 2 < mouseY && fish.y + fish.size / 2 > mouseY && target === 0) {
      target = fish;
    }
  }
}

function mouseReleased() {
  for (var fish of fishlist) {
    fish.noMove = false;
  }
  target.dx = mouseX-pmouseX;
  target.dy = mouseY-pmouseY;
  target = 0;

}

function keyPressed() {
  switch(keyCode) {
    case 78:
      nameF = document.getElementById("namefield");
      if (nameF.value != null) {
      target.name = nameF.value;
      }
  }
}
