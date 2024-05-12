// let cam;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   pixelDensity(9);
//   cam = createCapture(VIDEO);
//   cam.hide();
//   noStroke();
// }

// function draw() {
//   background(220);
//   image(cam, 0, 0);
//   cam.loadPixels();
  
//   for(let x = 0; x < cam.width; x += 10) {
//     for(let y = 0; y < cam.height; y += 10) {
//       let colorFromVideo = cam.get(x, y);
//       fill(colorFromVideo);
//       let rectSize = floor(random(5 , 13)); 
//       rect(x, y, rectSize, rectSize);
//     }
//   }    
// }

let img;

function preload() {
  img = loadImage('iphone.png', 'iphone3.png');
}

function setup() {
  createCanvas(400, 600);
  noSmooth();
  img.resize(width, height);
}

function draw() {
  img.loadPixels();
  for (let i = 0; i < 100; i++) {
    batchSwapPixels();
  }
  img.updatePixels();

  image(img, 0, 0, width, height);
}

function batchSwapPixels() {
  const batchCount = 10; // Adjust as needed
  for (let i = 0; i < batchCount; i++) {
    swapPixels();
  }
}

function averagePixels() {
  const xOne = floor(random(img.width));
  const yOne = floor(random(img.height));
  const colorOne = img.get(xOne, yOne);

  const xTwo = floor(random(img.width));
  const yTwo = floor(random(img.height));
  const colorTwo = img.get(xTwo, yTwo);

  const averageColor = lerpColor(colorOne, colorTwo, 0.5);

  img.set(xOne, yOne, averageColor);
  img.set(xTwo, yTwo, averageColor);
}

function swapPixels() {
  const xOne = floor(random(img.width));
  const yOne = floor(random(img.height));
  const colorOne = img.get(xOne, yOne);

  const xTwo = floor(random(img.width));
  const yTwo = floor(random(img.height));
  const colorTwo = img.get(xTwo, yTwo);

  img.set(xOne, yOne, colorTwo);
  img.set(xTwo, yTwo, colorOne);
}
