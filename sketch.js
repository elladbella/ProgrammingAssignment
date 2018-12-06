var numBalls = 9;
var spring = 0.05; // controls balls ability to bounce
var gravity = 0.03; // controls how fast the balls will fall
var friction = -0.7;
var balls = []; // array
var yText = 0;
var xText = 150;

//Setup code
function setup() {
  createCanvas(500, 500);
//Set appearance of balls
  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);
}
//Set background and movement of balls
function draw() 
{
  background('#f27194');
  
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();})
  
  //TEXT
  text('CLICK MEEEEE!',xText,yText);
	textSize(40);
	textFont('comic sans');
	textStyle(BOLD);
  	yText=yText+1.5;
	if(yText>500)  //Condition drop down reset coordinate 
		{
			yText=0;
		}
}
    function mousePressed()
    {
	yText=mouseY;
	xText=mouseX;
    }
  

function Ball(xin, yin, din, idin, oin) {
  this.x = xin;
  this.y = yin;
  var vx = 0;
  var vy = 0;
  this.diameter = din;
  this.id = idin;
  this.others = oin;

  this.collide = function() {
    for (var i = this.id + 1; i < numBalls; i++) {
      // Define others inside the array [i]
      
      var dx = this.others[i].x - this.x;
      var dy = this.others[i].y - this.y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = this.others[i].diameter / 2 + this.diameter / 2;
      
      // Condition distance      
      if (distance < minDist) {
        var angle = atan2(dy, dx);
        var targetX = this.x + cos(angle) * minDist;
        var targetY = this.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].x) * spring;
        var ay = (targetY - this.others[i].y) * spring;
        vx -= ax;
        vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
    
  };
  
  // Condition behavior (reset point, ending point)
  this.move = function() {
    vy += gravity;
    this.x += vx;
    this.y += vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      vy *= friction;
    }
  };
  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
  
}
