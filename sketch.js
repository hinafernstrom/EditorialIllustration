let video;
let canvas;
let pixelationStrength = 0;
let startTime;

function setup() {
  noCanvas();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('video-container');
  video = createVideo('iphone2.mp4', videoLoaded);
  video.size(850, 510);
  video.loop();
  video.elt.onended = function () {
    video.time(0);
    video.play();
  };
  video.volume(0);
  video.parent('video-container');
  let videoElement = select('video');
  videoElement.elt.removeAttribute('controls');
  console.log('A video of a toy robot with playback controls beneath it.');
}

function videoLoaded() {
  video.hide();
  startTime = millis(); // Record the start time
  manipulatePixels();
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

function manipulatePixels() {
  video.play();
  video.loadPixels();
  canvas.elt.getContext('2d').imageSmoothingEnabled = true;
  let elapsedTime = min((millis() - startTime) / 1000, 0.1);  // Keep total duration short
  console.log(elapsedTime)
  if (elapsedTime === 1) {console.log('1 sec reached')}
  if (elapsedTime > 1) {
    video.muted = false;
    pixelationStrength += 100;

    for (let i = 0; i < 100000; i++) { // Reduce the number of iterations for faster pixelation
      const index1 = getRandomIndex(video.width, video.height);
      const index2 = getAdjacentIndex(index1, video.width, video.height, randomDirection(), 5);

      if (index2 !== -1) {
        [video.pixels[index1], video.pixels[index2]] = [video.pixels[index2], video.pixels[index1]];
        [video.pixels[index1 + 1], video.pixels[index2 + 1]] = [min(video.pixels[index2 + 1] + 50, 255), min(video.pixels[index1 + 1] + 50, 255)];
        [video.pixels[index1 + 2], video.pixels[index2 + 2]] = [min(video.pixels[index2 + 2] + 50, 255), min(video.pixels[index1 + 2] + 50, 255)];
        [video.pixels[index1 + 3], video.pixels[index2 + 3]] = [min(video.pxels[index2 + 3] + 50, 255), min(video.pixels[index1 + 3] + 50, 255)];
      }
    }

    video.updatePixels();
  } else {
    video.muted = true;

    for (let i = 0; i < 1000000; i++) { // Reduce the number of iterations for faster dispersal
      const index1 = getRandomIndex(video.width, video.height);
      const index2 = getAdjacentIndex(index1, video.width, video.height, randomDirection(), 5);

      if (index2 !== -1) {
        [video.pixels[index1], video.pixels[index2]] = [video.pixels[index2], video.pixels[index1]];
        [video.pixels[index1 + 1], video.pixels[index2 + 1]] = [video.pixels[index2 + 1], video.pixels[index1 + 1]];
        [video.pixels[index1 + 2], video.pixels[index2 + 2]] = [video.pixels[index2 + 2], video.pixels[index1 + 2]];
        [video.pixels[index1 + 3], video.pixels[index2 + 3]] = [video.pixels[index2 + 3], video.pixels[index1 + 3]];
      }
    }

    video.updatePixels();
  }

  let xCenter = (canvas.width - video.width) / 2;
  let yCenter = (canvas.height - video.height) / 2;

  // Translate the video image to the center before rendering
  translate(xCenter, yCenter);

  image(video, 0, 0, video.width, video.height);

  // Reset the translation
  translate(-xCenter, -yCenter);

  requestAnimationFrame(manipulatePixels);
}


function randomDirection() {
  const directions = ['right', 'left', 'up', 'down'];
  return random(directions);
}
