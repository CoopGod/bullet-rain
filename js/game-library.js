// GAME MOVEMENT FUNCTIONS 

// OBJECT MOVEMENT FUNCTIONS ------------------------------------------------
// Draw bullets or destroy and replace 
function bulletDraw(bullets) {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y >= 600) {
      bullets.splice(i, 1);
      i--;
      bullets.push({
        x: randomInt(0, 801),
        y: -10,
        speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX),
        size: BULLETS_SIZE
      });
      // If game isn't over increase level
      if (!gameover) {
        bulletsDodged++;
        outputMessageHandler();
        updateLevels();
      }
    } else {
      rect(bullets[i].x, bullets[i].y, bullets[i].size, bullets[i].size, 'fill');
    }
  }
}

// move bullets on canvas
function bulletMove(bullets) {
  for (let n = 0; n < bullets.length; n++) {
    bullets[n].y += bullets[n].speed;
  }
}

// Populate bullets array
function populateBullets(bulletCount) {
  let tempArray = []
  for (let i = 0; i < bulletCount; i++) {
    tempArray.push({
      x: randomInt(0, 801),
      y: -10,
      speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX),
      size: BULLETS_SIZE
    });
  }
  return tempArray;
}

function playerMovement() {
  if (keyIsDown[37]) {
    if (player.x >= 0) {
      player.x -= PLAYER_SPEED;
    }
  }
  if (keyIsDown[38]) {
    if (player.y >= 0) {
      player.y -= PLAYER_SPEED;
    }
  }
  if (keyIsDown[39]) {
    if (player.x <= cnv.width - PLAYER_SIZE) {
      player.x += PLAYER_SPEED;
    }
  }
  if (keyIsDown[40]) {
    if (player.y <= cnv.height - PLAYER_SIZE) {
      player.y += PLAYER_SPEED;
    }
  }
}

// GAME LOGIC FUNCTIONS ---------------------------------------------------------
// Check if player hit by object
function playerHitCheck(player, objects) {
  for (let i = 0; i < objects.length; i++) {
    if (squareCollide(player, objects[i], PLAYER_SIZE, objects[i].size)) {
      player.x = -100;
      player.y = -100;
      gameover = true;
    }
  }
}

// bullet count updates
let bulletsDodgedOutput = document.getElementById('bulletsDodgedOutput'); // HTML El to update dodged
function outputMessageHandler() {
  bulletsDodgedOutput.innerHTML = bulletsDodged;
}

// LEVEL SETUP -----------------------------------------------------------------
// Check to see if level needs to be updated
function updateLevels() {
  if (bulletsDodged >= level1ScoreToBeat) {
    level = 2;
    levelSetup();
  }
  if (bulletsDodged >= level2ScoreToBeat && bulletsDodged <= level3ScoreToBeat) {
    level = 3;
    levelSetup();
  }
  if (bulletsDodged >= level3ScoreToBeat) {
    level = 4;
    levelSetup();
  }
}

function levelSetup() { // LEVELING FROM RUSSIA TO SPACE IS BROKEN (calls if level == 3 more than it should)
  if (level == 2 && level2Setup == false) {
    console.log('check') // Beach
    levelup(25)
    level2Setup = true;
  }
  if (level == 3 && level3Setup == false) {
    console.log('check') // Russia
    level3Setup == true;
    levelup(35)
    
  }
  if (level == 4 && level4Setup == false) { // Space
    console.log('check')
     levelup(45);
     level4Setup == true;
  }
}

// Display screen for leveling up
async function levelup(restockAmmout) {
  clearArray = [];
  // Level specifics (subtract one for actual level)
  if (level == 2) {
    tumbleweeds = clearArray;
  }
  if (level == 3) {
    beachballs = clearArray;
  }
  if (level == 4) {
    vodkas = clearArray;
  }
  bullets = clearArray; // Clear all bullets
  levelChange = true; // Update to draw front page
  await sleep(5000); // Leave time for break
  tempArray = populateBullets(restockAmmout);
  bullets = tempArray; // Restock bullets
  levelChange = false;
}

// Sleep for ms (milliseconds)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test if two square objects intersect
function squareCollide(rect1, rect2, rect1Size, rect2Size) {
  // Set bottom right corner to be compare with top left
  rect1Top = {
    x: rect1.x,
    y: rect1.y
  }
  rect2Top = {
    x: rect2.x,
    y: rect2.y
  }
  rect1Bottom = {
    x: rect1.x + rect1Size,
    y: rect1.y + rect1Size
  }
  rect2Bottom = {
    x: rect2.x + rect2Size,
    y: rect2.y + rect2Size
  }
  // If square to the left
  if (rect1Top.x > rect2Bottom.x || rect2Top.x > rect1Bottom.x) {
    return false;
  }
  // If overtop
  if (rect1Top.y > rect2Bottom.y || rect2Top.y > rect1Bottom.y) {
    return false;
  }
  // If neither they must be intercepting
  return true;
}

// DISPLAY MESSAGES -----------------------------------------------------------
function displayMessages() {
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

  // Check if game Over
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
}


// LEVEL SPECIFIC FUNCTIONS --------------------------------------------------

// LEVEL 1
let tumbleweedImage = document.createElement('img');
tumbleweedImage.src = 'media/tumbleweed.gif';

function tumbleweedDraw(tumbleweeds) {
  for (let i = 0; i < tumbleweeds.length; i++) {
    image(tumbleweedImage, tumbleweeds[i].x, tumbleweeds[i].y, tumbleweeds[i].size, tumbleweeds[i].size);
  }
}

function tumbleweedMove(tumbleweeds) {
  for (let n = 0; n < tumbleweeds.length; n++) {
    tumbleweeds[n].x += tumbleweeds[n].speed;
  }
}

function populateTumbleweed(tumbleweedCount) {
  let tempArray = []
  for (let i = 1; i < tumbleweedCount; i++) {
    // if i  is odd
    if (i % 2 == 1) {
      tempArray.push({
        x: randomInt(-8000, -200),
        y: randomInt(100, 501),
        speed: randomInt(4, 7),
        size: TUMBLEWEED_SIZE
      })
    }
    // if i  is even
    if (i % 2 == 0) {
      tempArray.push({
        x: randomInt(650, 8000),
        y: randomInt(100, 501),
        speed: randomInt(-6, -3),
        size: TUMBLEWEED_SIZE
      })
    }
  }
  return tempArray;
}


// LEVEL 2
let beachballImage = document.createElement('img');
beachballImage.src = 'media/beachball.png';

function beachballDraw(beachballs) {
  for (let i = 0; i < beachballs.length; i++) {
    image(beachballImage, beachballs[i].x, beachballs[i].y, beachballs[i].size, beachballs[i].size);
  }
}

function beachballMove(beachballs) {
  for (let n = 0; n < beachballs.length; n++) {
    beachballs[n].y += beachballs[n].speed;
  }
}

function populateBeachballs(beachballCount) {
  let tempArray = []
  for (let i = 0; i < beachballCount; i++) {
    tempArray.push({
      x: randomInt(50, 550),
      y: randomInt(2000, 10000),
      speed: randomInt(-5, -2),
      size: BEACH_BALL_SIZE
    })
  }
  return tempArray;
}

// LEVEL 3
let vodkaImage = document.createElement('img');
vodkaImage.src = 'media/vodka.png';

function vodkaDraw(vodkas) {
  for (let i = 0; i < vodkas.length; i++) {
    image(vodkaImage, vodkas[i].x, vodkas[i].y, vodkas[i].size, vodkas[i].size * 2);
  }
}

function vodkaMove(vodkas) {
  for (let n = 0; n < vodkas.length; n++) {
    vodkas[n].y += vodkas[n].speed;
    vodkas[n].x += vodkas[n].speed;
  }
}

function populateVodkas(vodkaCount) {
  let tempArray = []
  for (let i = 0; i < vodkaCount; i++) {
    // if i  is odd
    if (i % 2 == 1) {
      tempArray.push({
        x: -1300,
        y: -1500,
        speed: randomInt(2, 8),
        size: VODKA_SIZE
      })
    }
    // if i  is even
    if (i % 2 == 0) {
      tempArray.push({
        x: 1300,
        y: 1500,
        speed: randomInt(-2, -8),
        size: VODKA_SIZE
      })
    }
  }
  return tempArray;
}