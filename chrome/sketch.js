var red= "#dc3439";
var blue= "#3355d5";
var yellow= "#eeb500";
var green= "#86bd00";

var yoff = 0.0;
var state = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  
  //background(255);

}
function draw() {
  var r = random(0, 255);
  var g = random(0, 255);
  var b = random(0, 255);

  stroke(r, g, b);
  strokeWeight(0.2);
  noFill();
  beginShape();

  var xoff = 0;

  if (!state) {
    var xoff = yoff;
    for (var x = -2; x <= width+4; x += 10) {
      var y = map(noise(xoff, yoff), 0, 1, 1, 500)
      vertex(x, y);
      xoff += 0.04;
    }
  } else {

    for (var x = -2; x <= width+4; x += 10) {
      var y = map(noise(xoff, yoff), 0, 1, 1, 500)
      vertex(x, y);
      xoff += 0.05;
    }
  }

  yoff += 0.007;
  vertex(width+4, height+4);
  vertex(0, height+4);
  endShape(OPEN);

}

function mousePressed() {
  state = !state;
}



// var startAngle = 0;
// var angleVel = 0.05;


// function setup() {
//   createCanvas(windowWidth, windowHeight);

// }

// function draw() {
//   background(255, 238, 236);

//   startAngle += 0.015;
//   var angle = startAngle;

//   for (var x = 0; x <= width; x += 24) {
//     var y = map(sin(angle), -1, 1, 0, height);
//     noStroke();
//     fill(238, 188, 159, 60);
//     strokeWeight(2);
//     rect(x, y, 20, y);
//     rect(y, x, y, 20);
//     fill(165, 141, 127, 60);
//     rect(x - 10, y - 10, 10, y);
//     rect(y - 10, x - 10, y, 10);
//     angle += angleVel;
//   }

//   for (var xi = width; xi >= 0; xi -= 24) {
//     var yi = map(sin(angle * -1), 1, -1, 0, height);
//     noStroke();
//     fill(238, 188, 159, 60);
//     rect(xi, yi, 20, yi - x);
//     rect(yi, xi, yi + x, 20);
//     fill(165, 141, 127, 60);
//     rect(xi, yi, 10, yi - x / 2);
//     rect(yi, xi, yi/2 + x / 2, 10);
//   }
// }