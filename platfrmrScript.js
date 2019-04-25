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
var baseJumpAmt = 2;
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
var choiceSizeX = [80, 100];
var choiceSizeY = [20];
var boxAmt = 20;

var killPosX = [];
var killPosY = [];
var killMoveDirect = [];
var killSize = 30;
var killSpeed = 2;
var baseKillDelay = 100;
var killDelay = baseKillDelay;
var onScreenK = 0;
var maxOnScreenK = 40;

var controlPntInt = 200;
var pointTimer = setInterval(timmyTime, controlPntInt);
var points = 0;
var timeTimer = setInterval(tammyTimer, 1000);
var timeSpent = 0;

var startDecorX = Math.floor(w / 2 - 50);
var startDecorY = Math.floor(h / 3 + 50);
var startDecorSize = 30;
var startDecorSpeed = 0;
var startDecorSMax = 10;
var startDecorSMin = -10;
var startDecorInc = 0;
var startDecorIncMax = 10;

var events = "";
var starter = false;
var alive = true;
var player = new player(); //Player object
var testBlocks = new testBlocks();
var killerCircles = new killerCircles();

function setup() {
  createCanvas(w, h);
  for (var i = 0; i < boxAmt; i++) {
    var randSizeX = (Math.floor(Math.random() * choiceSizeX.length));
    var randSizeY = (Math.floor(Math.random() * choiceSizeY.length));
    boxSizeX.push(choiceSizeX[randSizeX]);
    boxSizeY.push(choiceSizeY[randSizeY]);
    var randX = (Math.floor(Math.random() * fixedSizeX - boxSizeX[i]) + boxSizeX[i]);
    var randY = (Math.floor(Math.random() * fixedSizeY - boxSizeY[i]) + boxSizeY[i]);
    boxPosX.push(randX);
    boxPosY.push(randY);
  }
}

function draw() {
  background(245);
  stroke(100);
  strokeWeight(6);
  noFill();
  rect(fixedPoint, fixedPoint, fixedSizeX, fixedSizeY);

  if (starter === false) {
    stroke(0);
    strokeWeight(1);
    fill(255, 0, 0);
    ellipse(startDecorX, startDecorY, startDecorSize);
    if (startDecorY < h - startDecorIncMax) {
      if (startDecorSpeed < startDecorSMax && startDecorInc === startDecorIncMax) {
        startDecorSpeed++;
        startDecorInc = 0;
      } else if (startDecorInc < startDecorIncMax) {
        startDecorInc++
      }
    } else if (startDecorY > h - startDecorSize) {
      startDecorSpeed = startDecorSMin;
    }
    startDecorY += startDecorSpeed;
  }
  if (starter === true && alive === true) {
    document.getElementById('dis').style.visibility = "visible";
    document.getElementById('title').style.visibility = "hidden";
    document.getElementById('credit').style.visibility = "hidden";
    testBlocks.activate();
    killerCircles.activate();
    player.display();
    player.moveX();
    player.moveY();
    player.eye();
    player.border();
  } else if (alive === false) {
    document.getElementById('deadTitle').style.visibility = "visible";
    document.getElementById('deadText').style.visibility = "visible";
    document.getElementById('reset').style.visibility = "visible";
  }

  document.getElementById('dis').innerHTML = "Points: " + points + " : Time: " + timeSpent;
  document.getElementById('events').innerHTML = events;
}

function start() {
  starter = true;
  document.getElementById('bttn').style.display = "none";
}

function restart() {
  location.href = "platfrmrGame.html";
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

  this.eye = function () {
    noStroke();
    fill(20);
    ellipse(this.x + playerSizeX / 2, this.y + playerSizeY / 2, playerSizeX - 10, playerSizeY - 10);
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
    for (var i = 0; i < boxAmt; i++) {
      this.x = boxPosX[i];
      this.y = boxPosY[i];
      strokeWeight(1);
      stroke(0);
      fill(boxColor);
      rect(this.x, this.y, boxSizeX[i], boxSizeY[i]);
      var collision = collideRectRect(player.x, player.y, playerSizeX, playerSizeY, this.x, this.y, boxSizeX[i], boxSizeY[i]);
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
  this.activate = function () {
    if (onScreenK < maxOnScreenK) {
      if (killDelay === 0) {
        var randX = Math.floor(Math.random() * 2);
        var randY = Math.floor(Math.random() * fixedSizeY - killSize) + killSize;
        killMoveDirect.push(randX);
        if (randX === 1) {
          randX = w - 1;
        } else if (randX === 0) {
          randX = 1;
        }
        killPosX.push(randX);
        killPosY.push(randY);
        killDelay = baseKillDelay;
        onScreenK++;
      } else if (killDelay > 0) {
        killDelay--;
      }
    }
    for (var i = 0; i < onScreenK; i++) {
      this.x = killPosX[i];
      this.y = killPosY[i];
      stroke(0);
      strokeWeight(1);
      fill(255, 0, 0);
      if (killMoveDirect[i] === 0) {
        killPosX[i] += killSpeed;
      }
      if (killMoveDirect[i] === 1) {
        killPosX[i] -= killSpeed;
      }
      if (killPosX[i] >= w || killPosX[i] <= 0) {
        killPosX.splice(i, 1);
        killPosY.splice(i, 1);
        killMoveDirect.splice(i, 1);
        onScreenK--;
      }
      ellipse(this.x, this.y, killSize);
      var collision = collideRectCircle(player.x, player.y, playerSizeX, playerSizeY, this.x, this.y, killSize - 10);
      if (collision === true) {
        alive = false;
      }
    }
  };
}

function timmyTime() {
  if (alive === true && starter === true) {
    points++;
  } else {}
}

function tammyTimer() {
  if (alive === true && starter === true) {
    timeSpent++;
    if (timeSpent === 1) {
      events = "No Additions";
    }
    if (timeSpent === 15) {
      events = "Size+";
      killSize = 40;
    }
    if (timeSpent === 25) {
      events = "Size+ Speed+";
      killSpeed = 4;
    }
    if (timeSpent === 30) {
      events = "Size+ Speed+ Frequency+ [Point Rate Incresed]";
      killDelay = 60;
      baseKillDelay = 60;
      controlPntInt = 150;
    }
    if (timeSpent === 45) {
      events = "Size++ Speed+ Frequency+";
      killSize = 50;
    }
    if (timeSpent === 55) {
      events = "Size++ Speed++ Frequency+";
      killSpeed = 6;
    }
    if (timeSpent === 60) {
      events = "Size++ Speed++ Frequency++ [Point Rate Incresed]";
      killDelay = 20;
      baseKillDelay = 20;
      controlPntInt = 100;
    }
    if (timeSpent === 90) {
      events = "Geyser [WARNING: Next change will blow up the circles size]";
      killSpeed = 10;
      killDelay = 5;
      baseKillDelay = 5;
      killSize = 10;
    }
    if (timeSpent === 120) {
      events = "Boulders";
      killSpeed = 4;
      killSize = 100;
      killDelay = 30;
      baseKillDelay = 30;
    }
    if (timeSpent === 150) {
      events = "DEATH [Point Rate Maxed]";
      killSpeed = 8;
      killSize = 60;
      killDelay = 12;
      baseKillDelay = 12;
      controlPntInt = 50;
    }
  } else if (alive === false) {
    events = "";
  }
}
            var key;
            var exitA = false;
            var exitB = false;
            var exitC = false;
            function exitFuncD(event) {
                key = event.keyCode;
                if (key === 53) {
                    exitA = true;
                }
                if (key === 56) {
                    exitB = true;
                }
                if (key === 48) {
                    exitC = true;
                }
                if (exitA && exitB && exitC) {
                    location.href = "https://thezooo.github.io";
                }
            }
            function exitFuncU(event) {
                key = event.keyCode;
                if (key === 53) {
                    exitA = false;
                }
                if (key === 56) {
                    exitB = false;
                }
                if (key === 48) {
                    exitC = false;
                }
            }
