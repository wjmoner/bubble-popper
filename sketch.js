var bubbles = [];
var howMany = 20;
var thisOne = [];
var blop;
var toggle = false;
var score = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  blop = loadSound('blop.mp3');
}

function setup() {
	createCanvas(960, 540);

  for (var i = 0; i < howMany; i++) {
    var x = random(width);
    var y = random(height);
    var r = 32;
    bubbles.push(new Bubble(x,y,r));
    bubbles[i].col = color(random(255), random(255), random(255));
  }

}

function draw() {
  background(0);
  
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  fill(255);
  text("Score: " + score, width - 100, height - 50);

}

function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {    
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
      blop.play();
      score++;
    } 
  }
}

function Bubble(x,y,r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.col = color(255, 200);

  this.display = function() {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, r, r);
  }

  this.move = function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
  }

  this.contains = function(mx, my) {
    if (dist(mx, my, this.x, this.y) < r/2) {
      return true;
    } else {
      return false;
    }
  }
}