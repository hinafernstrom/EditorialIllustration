var cashImages = [];
var numImages = 400;

function preload() {
  for (var i = 0; i < numImages; i++) {
    var imageName = i % 3 === 0 ? 'cash.png' : (i % 3 === 1 ? 'one.jpeg' : '50.jpeg');
    cashImages[i] = loadImage(imageName);
  }
}

function setup() {
  createCanvas(2048, 2048);
  frameRate(300);

  for (var i = 0; i < numImages; i++) {
    var x = random(width);
    var y = random(height);
    var size = random(90, 150);

    if (cashImages[i].width > 0) {
      image(cashImages[i], x, y, size * 2, size);
    }
  }
}

function draw() {
  // Optional: Add dynamic animations or interactions in the draw function if needed
  var x = random(width);
  var y = random(height);
  var size = random(50, 150);

  if (cashImages[0].width > 0) {
    image(cashImages[0], x, y, size * 2, size);
  }
}


