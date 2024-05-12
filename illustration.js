var shapes = [];
var img;

function preload() {
  img = loadImage('cash.png', imageLoaded);
}

function imageLoaded() {
  console.log('Image loaded successfully');
}

function setup() {
  createCanvas(700, 700);
  frameRate(30);
  
  for(var i = 0; i < 10; i++){
    shapes[i] = new Shape(random(0, width), random(0, height));
  }
}

function draw() {
  // background(5, 5, 5, 255);
  
  for(var i = 0; i < shapes.length; i++){
    shapes[i].update();
    shapes[i].create();
    shapes[i].bounce();
  }
}

// creates a shape with an image
function Shape(x, y){
  this.x = x;
  this.y = y;
  this.size = 100;
  
  this.xspeed = random(-4, 4);
  this.yspeed = random(-4, 4);
  
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  
  this.create = function() {
    if (img.width > 0) {
      image(img, this.x, this.y, this.size*2, this.size);
    }
  }
  
  this.bounce = function(){
    if(this.x > width || this.x < 0){
      this.xspeed *= -1;
    }
    
    if(this.y > height || this.y < 0){
      this.yspeed *= -1;
    }
  }
}
