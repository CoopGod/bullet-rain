// BULLET RAIN

//TODO
// ADD -> bullets range in colors on gray scale
// ADD -> Level display in top corner and change backgrounds and players per level increase
// make new file called levels.js and have different draw functions (insides). These can be
// called instead of the regular draw function
// ADD -> Final level bullets go rainbow and background goes black

// Set Canvas Size
canvasSize(800, 600);

// GLOBAL SIZE VARIABLES
let PLAYER_SIZE = 15;
let PLAYER_SPEED = 3;
let BULLETS_SIZE = 10;
let BULLETS_SPEED_MIN = 2;
let BULLETS_SPEED_MAX = 6;

// Set and Hold player position
let player = {
  x: 350,
  y: 250
};

// Bullets array
let bullets = populateBullets(12);

// GLOBAL VARIABLES
let gameover = false;
let levelChange = false;
let gameBeaten = false;
let bulletsDodged = 0;
let level = 1;

// Main Draw Loop
requestAnimationFrame(draw);

function draw() {
  // LEVEL SELECTOR BROKEN CANNOT SWITCH LEVELS
  if (level == 1) {
    level1();
  }
  if (level == 2) {
    level2(); 
  }
  if (level == 3) {
    level3();
  }
  if (level == 4) {
    level4();
  }
  if (level == 5) {
    level5();
  }

  // CHECK TO DISPLAY MESSAGES
 displayMessages();

  requestAnimationFrame(draw);
}
