var w = window.innerWidth; //Window Width
var h = window.innerHeight; //Window Height
var playerSize = 20; //Player Size
var xSpeed = 0; //x speed that changes
var xSpeedCapMin = -5; //x speed cap MIN
var xSpeedCapMax = 5; //x speed cap MAX
var xInc = 0; //x increment in speed
var xIncCap = 3; //cap when the increment happens

var player = new player(); //Player object

function setup() {
    createCanvas(w, h);
}

function draw() {
    background(245);
    stroke(100);
    strokeWeight(6);
    noFill();
    rect(playerSize, playerSize, w - playerSize * 2, h - playerSize * 2);

    player.display();
    player.moveX();

    document.getElementById('dump').innerHTML = xSpeed + " " + xInc;
}

function player() {
    this.x = 40;
    this.y = 40;
    this.display = function () { //Displaying Player
        stroke(0);
        strokeWeight(1);
        fill(48, 136, 36);
        rect(this.x, this.y, playerSize, playerSize);
        //--------------------------Borders--------------------------
        if (this.x > w - playerSize * 2) {
            this.x = w - playerSize * 2;
            xSpeed = 0;
        }
        if (this.x < playerSize) {
            this.x = playerSize;
            xSpeed = 0;
        }
        if (this.y > h - playerSize * 2) {
            this.y = h - playerSize * 2;
            ySpeed = 0;
        }
        if (this.y < playerSize) {
            this.y = playerSize;
            ySpeed = 0;
        }
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
}
