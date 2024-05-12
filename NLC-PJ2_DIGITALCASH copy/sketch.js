var shapes = [];
var images = [];

function preload() {
  // Load six images
  images[0] = loadImage('moneyone.png');
  images[1] = loadImage('moneytwo.png');
  images[2] = loadImage('moneythree.png');
  images[3] = loadImage('moneyfour.png');
  images[4] = loadImage('moneyfive.png');
  images[5] = loadImage('coin.png');
}

function setup() {
  createCanvas(2000, 2000);
  frameRate(60);
}

function draw() {
  background(255);

  // Update and display existing shapes
  for (var i = shapes.length - 1; i >= 0; i--) {
    shapes[i].update();
    shapes[i].create();
    shapes[i].bounce();

    // Remove shapes that are out of bounds
    if (shapes[i].y > height + 50) {
      shapes.splice(i, 1);
    }
  }

  // Generate new shapes continuously
  if (frameCount % 30 == 0) {
    for (var i = 0; i < 5; i++) {
      if (i === 4) {
        shapes.push(new Shape(random(width), random(height), images[5], 70, 70));
      } else {
        shapes.push(new Shape(random(width), random(height), random(images.slice(0, 5)), 150, 80));
      }
    }
  }

  // Draw coins generated on click
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].image === images[5]) {
      shapes[i].create();
    }
  }
}

function mouseClicked() {
  // Create coins at the mouse position when clicked
  for (var i = 0; i < 5; i++) {
    shapes.push(new Shape(mouseX, mouseY, images[5], 70, 70));
  }
}

function Shape(x, y, img, w, h) {
  this.x = x;
  this.y = y;
  this.image = img;
  this.width = w;
  this.height = h;

  this.xspeed = random(-4, 4);
  this.yspeed = random(1, 4);

  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  this.create = function() {
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
  }

  this.bounce = function() {
    if (this.x > width - this.width / 2 || this.x < this.width / 2) {
      this.xspeed *= -1;
    }

    if (this.y > height - this.height / 2 || this.y < this.height / 2) {
      this.yspeed *= -1;
    }
  }
}
