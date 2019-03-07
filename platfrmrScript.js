var w = window.innerWidth; //Window Width
var h = window.innerHeight; //Window Height
var playerSize = 20; //Player Size
var xSpeed = 0; //x speed that changes
var xSpeedCap = 5; //x speed cap
var xInc = 0;
var xIncCap = 5;
var xKeyActive = 0;
var ySpeed = 0; //y speed that changes
var ySpeedCap = 5; //y speed cap
var yInc = 0;
var yIncCap = 5;
var yKeyActive = 0;

var player = new player(); //Player object

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(245);
  stroke(100);
  strokeWeight(6);
  noFill();
  rect(0, 0, w, h);
  
  player.display();
  player.move();
  
  document.getElementById('dump').innerHTML = xSpeed + " " + xSpeedCap + " " + xInc + " keyactive: " + xKeyActive + " " + yKeyActive;
}

function player() {
  this.x = 10;
  this.y = 10;
  this.display = function () { //Displaying Player
    stroke(0);
    strokeWeight(1);
    fill(48,136,36);
    rect(this.x,this.y,playerSize,playerSize);
  };
  this.move = function () {
    if (keyIsDown(65) || keyIsDown(68)) { //Increment xSpeed
      if (xSpeed < xSpeedCap && xInc === xIncCap) {
        xSpeed++;
      } else if (xInc < xIncCap) {
        xInc++;
      }
    } else if (xSpeed > 0 && xInc === 0) {
      xSpeed--;
      xInc = xIncCap;
    } else if (xInc > 0) {
      xInc--;
    }
    //----------------------------------------------------------
    if (keyIsDown(87) || keyIsDown(83)) { //Increment ySpeed
      if (ySpeed < ySpeedCap && yInc === yIncCap) {
        ySpeed++;
      } else if (yInc < yIncCap) {
        yInc++;
      }
    } else if (ySpeed > 0 && yInc === 0) {
      ySpeed--;
      yInc = yIncCap;
    } else if (yInc > 0) {
      yInc--;
    }
    //----------------------------------------------------------
    if (keyIsDown(65)) { //left
      xKeyActive = 1;
    }
    if (keyIsDown(68)) { //right
      xKeyActive = 2;
    }
    if (keyIsDown(87)) { //up
      yKeyActive = 1;
    }
    if (keyIsDown(83)) { //down
      yKeyActive = 2;
    }
    //----------------------------------------------------------
    if (xKeyActive === 1) {
      this.x -= xSpeed;
    }
    if (xKeyActive === 2) {
      this.x += xSpeed;
    }
    if (yKeyActive === 1) {
      this.y -= ySpeed;
    }
    if (yKeyActive === 2) {
      this.y += ySpeed;
    }
    //----------------------------------------------------------
    if (this.x > w - playerSize) {
      this.x = w - playerSize;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > h - playerSize) {
      this.y = h - playerSize;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  };
}
