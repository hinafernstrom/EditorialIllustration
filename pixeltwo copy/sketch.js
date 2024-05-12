
function preload() {
  img = loadImage("iphone.gif");
}

function setup() {
  createCanvas(850, 500);
  img.resize(300, 200);
  noSmooth();
}

function draw() {
  img.loadPixels();

  // Increase the number of iterations and add direction and distance parameters
  sortPixels(500, randomDirection(), 5);

  img.updatePixels();
  image(img, 0, 0, width, height);
}

function sortPixels(iterations, direction, distance) {
  const pixels = img.pixels;

  for (let i = 0; i < iterations; i++) {
    const index1 = getRandomIndex(img.width, img.height);
    const index2 = getAdjacentIndex(index1, img.width, img.height, direction, distance);

    if (index2 !== -1) {
      // Swap the pixel values directly in the pixels array
      [pixels[index1], pixels[index2]] = [pixels[index2], pixels[index1]];
      [pixels[index1 + 1], pixels[index2 + 1]] = [pixels[index2 + 1], pixels[index1 + 1]];
      [pixels[index1 + 2], pixels[index2 + 2]] = [pixels[index2 + 2], pixels[index1 + 2]];
      [pixels[index1 + 3], pixels[index2 + 3]] = [pixels[index2 + 3], pixels[index1 + 3]];
    }
  }
}


function randomDirection() {
  const directions = ['right', 'left', 'up', 'down'];
  return random(directions);
}

function getRandomIndex(width, height) {
  const x = floor(random(width));
  const y = floor(random(height));
  return (y * width + x) * 4;
}

function getAdjacentIndex(index, width, height, direction, distance) {
  const x = (index / 4) % width;
  const y = floor((index / 4) / width);

  let newX = x;
  let newY = y;

  switch (direction) {
    case 'right':
      newX += distance;
      break;
    case 'left':
      newX -= distance;
      break;
    case 'up':
      newY -= distance;
      break;
    case 'down':
      newY += distance;
      break;
    default:
      return -1;
  }

  if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
    return ((newY) * width + newX) * 4;
  } else {
    return -1;
  }
}