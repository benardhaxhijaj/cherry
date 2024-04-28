let paths = [];
let num = 3;
let count = 0;
let bloomInterval = 10000; // Interval in milliseconds

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  stroke(255, 0, 0); // Set initial stroke color to red
  smooth();
  bloom(); // Start the blooming process
}

function draw() {
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    strokeWeight(path.diameter);
    line(path.lastLocation.x, path.lastLocation.y, path.location.x, path.location.y);
    path.update();
  }
}

function bloom() {
  background(250); // Clear the canvas for a new bloom
  paths = []; // Reset the paths array
  for (let i = 0; i < num; i++) {
    paths.push(new Pathfinder());
  }
  setTimeout(bloom, bloomInterval); 
}

class Pathfinder {
  constructor(parent = null) {
    this.lastLocation = createVector(width / 2, height);
    this.location = this.lastLocation.copy();
    // Reduced velocity for a slower movement
    this.velocity = createVector(0, -2);
    this.diameter = 19.88400223199278;
    this.isFinished = false;
    
    if (parent) {
      this.location = parent.location.copy();
      this.lastLocation = parent.lastLocation.copy();
      // Reduced velocity for a slower movement
      this.velocity = parent.velocity.copy().mult(0.4);
      this.diameter = parent.diameter * 0.62;
      this.isFinished = parent.isFinished;
      parent.diameter = this.diameter;
    }
  }
  
  update() {
    if (this.location.x > -10 && this.location.x < width + 10 && this.location.y > -10 && this.location.y < height + 10) {
      this.lastLocation.set(this.location);
      if (this.diameter > 0.2) {
        let bump = p5.Vector.random2D().mult(0.4); // Smaller bump for a finer movement
        this.velocity.normalize().mult(1.6).add(bump).mult(random(2, 3)); // Slower velocity changes
        this.location.add(this.velocity);
        if (random() < 0.08) { // Reduced chance for branching
          paths.push(new Pathfinder(this));
        }
      } else {
        if (!this.isFinished) {
          this.isFinished = true;
          noStroke();
          fill(255, 0, 0); // Change fill color to red
          ellipse(this.location.x, this.location.y, 10, 10);
          stroke(255, 0, 0); // Change stroke color to red
        }
      }
    }
  }
}
