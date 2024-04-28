var target = 0;
var mode = null;
var cursorMode = "drag";
var startX = null;
var startY = null;
const start = Date.now();

fishlist = []
walllist = []
circlelist = []

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
      if (fish.name != null && mouseIsPressed == false) {
        textAlign(LEFT,BOTTOM)
        text(fish.name,mouseX,mouseY)
      }
    } else {
      fish.saturation = 100;
    }
  }

  for (var wall of walllist) {
    wall.drawSelf();
  }

  for (var circle of circlelist) {
    circle.drawSelf();  
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
    switch (cursorMode) {
      case "drag":
        fill(0,0,100)
        break
      case "line":
        fill(0,0,0)
        break
      case "circle":
        fill(0,0,50)
        break
    }
    triangle(0,0,4,10,10,4);
    pop();
  }

  if (mouseIsPressed) {
    for (var fish of fishlist) {
      text(fish.name,fish.x,fish.y)
    }

    if (startX != null && startY != null) {
      push();
      stroke(0,100,100);
      strokeWeight(4);
      point(startX,startY);
      pop();
    }
  }

  switch (mode) {
    case 0:
      if (target == 0) {
        document.getElementById("contentP").innerHTML = "No Fish Selected."
      } else {
        document.getElementById("contentP").innerHTML = "Size: " + target.size + "<br>Speed: " + target.speed + "<br>Color: " + target.color + "<br><br>Position: (" + target.x + ", " + target.y + ")" + "<br>Facing: " + atan2(target.dy, target.dx) * (180 / PI);
      }
      break
    case 2:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        document.getElementById("contentP").innerHTML = "Position: (" + mouseX + ", " + floor(mouseY) + ")<br>Time Elapsed: " + str(floor((Date.now()-start)/10)/100);

      } else {
        document.getElementById("contentP").innerHTML = "Position: NA<br>Time Elapsed: " + str(floor((Date.now()-start)/10)/100);
      }
      while (document.getElementById("contentButtons").hasChildNodes() == true) {
        document.getElementById("contentButtons").removeChild(document.getElementById("contentButtons").firstChild);
      }
      break
    case 847:
      document.getElementById("contentP").innerHTML = "Fish with SPICE.";
      while (document.getElementById("contentButtons").hasChildNodes() == true) {
        document.getElementById("contentButtons").removeChild(document.getElementById("contentButtons").firstChild);
      }
      break
    default:
      document.getElementById("contentP").innerHTML = "";
      while (document.getElementById("contentButtons").hasChildNodes() == true) {
        document.getElementById("contentButtons").removeChild(document.getElementById("contentButtons").firstChild);
      }
  }

}

function mouseDragged() {
  switch (cursorMode) {
    case "drag":
      for (var fish of fishlist) {
        if (fish.x - ((fish.size * fish.speed / 5) / 2) < mouseX && fish.x + ((fish.size * fish.speed / 5) / 2) > mouseX && fish.y - fish.size / 2 < mouseY && fish.y + fish.size / 2 > mouseY && target === 0) {
          target = fish;
        }
      }
      break
    default:
      break
  }
}

function mousePressed() {
  switch (cursorMode) {
    case "line":
      if (startX != null && mouseX >= 0) {
        var wall = new Wall(startX, startY, mouseX, mouseY);
        walllist.push(wall);
        startX = null;
        startY = null;
      } else {
        if (mouseX >= 0) {
        startX = mouseX;
        startY = mouseY;
        }
      }
      break
    case "circle":
      if (startX != null && mouseX >= 0) {
        var circle = new Circle(startX, startY, sqrt((startX - mouseX)**2 + (startY - mouseY)**2));
        circlelist.push(circle);
        startX = null;
        startY = null;
      } else {
        if (mouseX >= 0) {
        startX = mouseX;
        startY = mouseY;
        }
      }
      break
    default:
      break
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
    case 49:
      cursorMode = "drag";
      break
    case 50:
      cursorMode = "line";
      break
    case 51:
      cursorMode = "circle";
      break
    case 78:
      nameF = document.getElementById("namefield");
      if (nameF.value != null) {
      target.name = nameF.value;
      }
      break
    case 88:
      if (cursorMode != "drag") {
        walllist = [];
        circlelist = [];
      }
  }
}
