var radius;
var ang;

var angleOffset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  angleMode(DEGREES);
  noFill();
  textSize(20);

  radius = 500;
  ang = 90;
  angleOffset = 0;
}

function draw() {
  angleOffset += 0.1; // Increment the angle to create movement

  background(195, 100, 98); // Color-changing background with transparency
  translate(width / 2, height / 2);
  beginShape();
  for (ang = 0; ang <= 360; ang += 1) {
    var offsetXRad = cos(ang + angleOffset) + 1;
    var offsetYRad = sin(ang + angleOffset) + 1;
    var x = radius * cos(angleOffset * offsetXRad) * cos(ang);
    var y = radius * cos(angleOffset * offsetYRad) * sin(ang);
    stroke(255, map(sin(ang + angleOffset), -1, 1, 255, 0));
    line(0, 0, x, y); // Lines originate from the center

    fill(255); // Set fill color to white
    circle(x, y, 5); // Draw filled circle
    noFill(); // Disable fill for other shapes

    vertex(x, y);
  }
  endShape(CLOSE);
}
