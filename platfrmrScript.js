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
var boxColor = [];
var boxSizeX = [];
var boxSizeY = [];
var choiceSize = [30,40,50,60];
var boxAmt = 1;

var player = new player(); //Player object
var testBlocks = new testBlocks();

function setup() {
    createCanvas(w, h);
    for (var i = 0;i < boxAmt;i++) {
      var randShade = (Math.floor(Math.random() * 236) + 20);
      var randSizeX = (Math.floor(Math.random() * choiceSize.length));
      var randSizeY = (Math.floor(Math.random() * choiceSize.length));
      var randX = (Math.floor(Math.random() * fixedSizeX - fixedPoint) + fixedPoint);
      var randY = (Math.floor(Math.random() * fixedSizeY - fixedPoint) + fixedPoint);
      boxPosX.push(randX);
      boxPosY.push(randY);
      boxColor.push(randShade);
      boxSizeX.push(choiceSize[randSizeX]);
      boxSizeY.push(choiceSize[randSizeY]);
    }
}

function draw() {
    background(245);
    stroke(100);
    strokeWeight(6);
    noFill();
    rect(fixedPoint, fixedPoint, fixedSizeX, fixedSizeY);
    
    testBlocks.activate();
    player.display();
    player.moveX();
    player.moveY();
    player.tracker();
    player.border();
    
    
    //document.getElementById('dump').innerHTML = ;
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
      ellipseMode(CENTER);
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
      fill(boxColor[i]);
      rect(this.x,this.y,boxSizeX[i],boxSizeY[i]);
      var boxMinX = boxPosX[i] - playerSizeX;
      var boxMaxX = boxPosX[i] + boxSizeX[i];
      var boxMinY = boxPosY[i] - playerSizeY;
      var boxMaxY = boxPosY[i] + boxSizeY[i];
      var dBox = Math.floor(dist(player.x + playerSizeX/2,player.y + playerSizeY/2,this.x,this.y));
      line(player.x,player.y,this.x,this.y);
      if (boxMaxX > player.x && boxMinX < player.x && boxMinY >= player.y && dBox <= playerSizeY) { //Top of the box
        player.y = boxMinY;
        gravity = 0;
      }
    }
    document.getElementById('dump').innerHTML = dBox + " " + boxMaxX + " " + boxMinX;
  };
}
