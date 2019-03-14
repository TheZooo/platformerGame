var w = window.innerWidth; //Window Width
var h = window.innerHeight; //Window Height
var playerSize = 20;
var playerSizeX = playerSize; //Player Size
var playerSizeY = playerSize;
var crouchDec = 10;
var fixedPoint = playerSize;
var fixedSizeX = w - fixedPoint * 2;
var fixedSizeY = h - fixedPoint * 2;
var xSpeed = 0; //x speed that changes
var xSpeedCapMin = -5; //x speed cap MIN
var xSpeedCapMax = 5; //x speed cap MAX
var xInc = 0; //x increment in speed
var xIncCap = 2; //cap when the increment happens
var ySpeed = 0;
var ySpeedCap = -6;
var yDec = 0;
var yDecCap = 5;
var baseJumpAmt = 1;
var jumpAmt = baseJumpAmt;
var gravity = 1;
var gravityCap = 5;
var gravityInc = 0;
var gravityIncCap = 5;

var boxPosX = [];
var boxPosY = [];
var boxColor = 230;
var boxSizeX = [];
var boxSizeY = [];
var choiceSizeX = [80,100];
var choiceSizeY = [20];
var boxAmt = 20;

var killPosX = [];
var killPosY = [];
var killSize = 20;
var killSpeed = 2;
var killDelay = 80;
var onScreenK = 0;
var maxOnScreenK = 20;

var starter = false;
var player = new player(); //Player object
var testBlocks = new testBlocks();
var killerCircles = new killerCircles();

function setup() {
    createCanvas(w, h);
    for (var i = 0;i < boxAmt;i++) {
      var randSizeX = (Math.floor(Math.random() * choiceSizeX.length));
      var randSizeY = (Math.floor(Math.random() * choiceSizeY.length));
      boxSizeX.push(choiceSizeX[randSizeX]);
      boxSizeY.push(choiceSizeY[randSizeY]);
      var randX = (Math.floor(Math.random() * fixedSizeX - boxSizeX[i]) + boxSizeX[i]);
      var randY = (Math.floor(Math.random() * fixedSizeY - boxSizeY[i]) + boxSizeY[i]);
      boxPosX.push(randX);
      boxPosY.push(randY);
      boxCollision.push(false);
    }
}



function draw() {
    background(245);
    stroke(100);
    strokeWeight(6);
    noFill();
    rect(fixedPoint, fixedPoint, fixedSizeX, fixedSizeY);
    
    if (starter === true) {
      testBlocks.activate();
      killerCircle.activate();
      player.display();
      player.moveX();
      player.moveY();
      player.tracker();
      player.border();
    }
}

function start() {
  starter = true;
  document.getElementById('bttn').style.display = "none";
}

function player() {
    this.x = 40;
    this.y = 40;
    this.display = function () { //Displaying Player
        stroke(0);
        strokeWeight(1);
        fill(48, 136, 36);
        rect(this.x, this.y, playerSizeX, playerSizeY);
    };

    this.moveX = function () { //Moving in terms of x position
        //65 left, 68 right
        if (keyIsDown(65) && !keyIsDown(68)) { //Increment xSpeed
            if (xSpeed > xSpeedCapMin && xInc === xIncCap) {
                xSpeed--;
                xInc = 0;
            } else if (xInc < xIncCap) {
                xInc++;
            }
        }
        if (keyIsDown(68) && !keyIsDown(65)) {
            if (xSpeed < xSpeedCapMax && xInc === xIncCap) {
                xSpeed++;
                xInc = 0;
            } else if (xInc < xIncCap) {
                xInc++;
            }
        }
        if ((!keyIsDown(65) && !keyIsDown(68)) || (keyIsDown(65) && keyIsDown(68))) {
            if (xInc === 0) {
                if (xSpeed > 0) {
                    xSpeed--;
                    xInc = xIncCap;
                } else if (xSpeed < 0) {
                    xSpeed++;
                    xInc = xIncCap;
                }
            } else if (xInc > 0) {
                xInc--;
            }
        }
        this.x += xSpeed;
    };

    this.moveY = function () { //Moving in terms of y position
        //87 up, 83 down
        if (keyIsDown(87) && jumpAmt > 0) {
            if (ySpeed === 0) {
                ySpeed = ySpeedCap;
                gravity = 0;
                jumpAmt--;
            }
        }
        if (keyIsDown(83)) {
          if (playerSizeY === playerSize) {
            playerSizeY = crouchDec;
          }
        } else if (playerSizeY !== playerSize) {
            playerSizeY = playerSize;
        }
        if (ySpeed === 0) {
            if (gravity < gravityCap && gravityInc === gravityIncCap) {
                gravity++;
                gravityInc = 0;
            } else if (gravityInc < gravityIncCap) {
                gravityInc++;
            }
        }
        if (ySpeed < 0 && yDec === yDecCap) {
            ySpeed++;
            yDec = 0;
        } else if (yDec < yDecCap) {
            yDec++;
        }
        if (this.y >= fixedSizeY) {
            jumpAmt = baseJumpAmt;
        }
        this.y += ySpeed + gravity;
    };
    
    this.tracker = function () {
      noStroke();
      fill(20);
      ellipse(this.x + playerSizeX/2,this.y + playerSizeY/2,playerSizeX-10,playerSizeY-10);
    }

    this.border = function () {
        if (this.x > fixedSizeX) {
            this.x = fixedSizeX;
            xSpeed = 0;
        }
        if (this.x < playerSizeX) {
            this.x = playerSizeX;
            xSpeed = 0;
        }
        if (this.y > fixedSizeY) {
          if (playerSizeY === crouchDec) {
            this.y = fixedSizeY + crouchDec;
          } else {
            this.y = fixedSizeY;
            ySpeed = 0;
          }
        }
        if (this.y < playerSizeY) {
            this.y = playerSizeY;
            ySpeed = 0;
        }
    };
}

function testBlocks() {
  this.activate = function () {
    for (var i = 0;i < boxAmt;i++) {
      this.x = boxPosX[i];
      this.y = boxPosY[i];
      strokeWeight(1);
      stroke(0);
      fill(boxColor);
      rect(this.x,this.y,boxSizeX[i],boxSizeY[i]);
      var collision = collideRectRect(player.x,player.y,playerSizeX,playerSizeY,this.x,this.y,boxSizeX[i],boxSizeY[i]);
      if (collision === true) {
        if (player.y < boxPosY[i]) {
          player.y = this.y - playerSizeY;
          gravity = 0;
          jumpAmt = baseJumpAmt + 1;
        }
        if (player.y > boxPosY[i]) {
          ySpeed = 0;
        }
        if (player.x < boxPosX[i] - playerSizeX) {
          xSpeed = 0;
        }
        if (player.x > boxPosX[i] + boxSizeX[i]) {
          xSpeed = 0;
        }
      }
    }
  };
}

function killerCircles() {
  this.activate = function() {
    if (onScreenK < maxOnScreenK) {
      if (killDelay < 0) {
        var randX = Math.floor(Math.random() * 2);
        var randY = Math.floor(Math.random() * fixedSizeY - killSize*2) + killSize;
        if (randX === 1) {
          randX = w;
        }
        killPosX.push(randX);
        killPosY.push(randY);
      } else if (killDelay > 0) {
        killDelay--;
      }
      for (var i = 0;i < onScreenK;i++) {
        stroke(0);
        strokeWeight(1);
        fill(255,0,0);
      }
    }
  };
}
