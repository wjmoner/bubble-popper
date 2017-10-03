var bubbles = []; // initialize array for holding bubbles
var howMany = 20; // how many bubbles do we need?

var blop; // undefined variable for our sound, using p5.sound.js
var score = 0; // score var initialized at zero


// preload is useful for grabbing images, sound, or media
// and loading them prior to setup
function preload() {
  soundFormats('mp3', 'ogg');
  blop = loadSound('blop.mp3'); // requires p5.sound.js in HTML file
} 

// setup runs first
function setup() {

	createCanvas(960, 540); // establish the canvas space

  // create each bubble object by calling Bubble constructor
  for (var i = 0; i < howMany; i++) {
    var x = random(width); // create & init x
    var y = random(height); // create & init y
    var diam = 32; // create diameter

    // pass vars to object using new; push each item into
    // the bubbles array
    bubbles.push(new Bubble(x,y,diam)); 

    // access bubble by number and give it a random rgb color
    bubbles[i].col = color(random(255), random(255), random(255));
  }

}

// draw() redraws screen every 50ms
function draw() {
  
  background(0); // redraw background every 50ms
  
  // for the length of the bubbles array
  // move each bubble and then redraw it
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }


  // the following lines are for scoring
  fill(255); // color of text
  textSize(32); // size of text
  text("Score: " + score, width - 200, height - 50); //show score

}

// when mouse is pressed, process each bubble to see if
// the mouse is inside the bubble using the 'contains' method
// in the Bubble constructor
function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {    
    if (bubbles[i].contains(mouseX, mouseY)) { // uses Boolean true/false from constructor
      bubbles.splice(i, 1); // remove bubble from array & screen
      blop.play(); // play our sound
      score++; // increment our score by 1
    } 
  }
}

// Bubble constructor (can be stored in a separate JS file)
function Bubble(x,y,diam, col) {
  this.x = x; // apply parameters to 'this' instance of a particular object
  this.y = y;
  this.diam = diam;
  this.col = color(255, 200); // default color if none provided
  this.str = color(255);

  // display method to make the shape
  this.display = function() {
    stroke(this.str); // stroke color
    fill(this.col); // fill color
    ellipse(this.x, this.y, diam, diam); // draw the ellipse
  }

  // move function to make it wiggle
  this.move = function() {
      this.x = this.x + random(-1, 1); // curr pos of x + random btwn -1 and 1
      this.y = this.y + random(-1, 1); 
  }

  // check for mousex and mousey in the same space as the bubble
  this.contains = function(mx, my) {
    if (dist(mx, my, this.x, this.y) < diam/2) {
      return true; // returning true means it is indeed intersecting
    } else {
      return false; // no intersect
    }
  }
}