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

// Main Draw Loop
requestAnimationFrame(draw);

function draw() {
  level1();
  // Check if level changing
  if (levelChange) {
    player.x = 400 - PLAYER_SIZE;
    player.y = 300 - PLAYER_SIZE;
    fill("blue");
    font("100px Franklin Gothic Medium");
    text("LEVEL UP", 180, 100, 'fill');
    font("40px Franklin Gothic Medium");
    text("enjoy your 5 second break", 160, 150, 'fill');
  }

  // Check if player hit
  playerHitCheck(player, bullets);
  if (gameover) {
    fill("red");
    font("100px Franklin Gothic Medium");
    text("GAME OVER", 120, 100, 'fill');
    font("40px Franklin Gothic Medium");
    text("press space to replay", 200, 150, 'fill');
  }

  // Check if game Beaten
  if (gameBeaten) {
    fill("green");
    font("100px Franklin Gothic Medium");
    text("You Survived", 120, 100, 'fill');
    font("40px Franklin Gothic Mediumorgia");
    text("press space to replay", 230, 150, 'fill');
  }

  requestAnimationFrame(draw);
}