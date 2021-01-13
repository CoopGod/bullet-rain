// GAME MOVEMENT FUNCTIONS 

// OBJECT MOVEMENT FUNCTIONS ------------------------------------------------
// Draw bullets or destroy and replace 
function bulletDraw(bullets) {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y >= 600) {
      bullets.splice(i, 1);
      i--;
      bullets.push({ x: randomInt(0, 801), y: -10, speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX), size: BULLETS_SIZE});
      bulletsDodged++;
      // If game isn't over increase level
      if (!gameover) {
        outputMessageHandler(bulletsDodged);
      }
    }
    else {
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
    tempArray.push({ x: randomInt(0, 801), y: -10, speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX), size: BULLETS_SIZE});
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
    if (squareCollide(player, objects[i], PLAYER_SIZE, objects.size)) {
      console.log("HIT!")
      //player.x = -100;
      //player.y = -100;
      gameover = true;
    }
  }
}

// Update message on HTML and increase difficulty
let output = document.getElementById('output'); // HTML El to update level
let bulletsDodgedOutput = document.getElementById('bulletsDodgedOutput'); // HTML El to update dodged
function outputMessageHandler(bulletsDodged) {
  if (bulletsDodged == 199) {
    output.innerHTML = "It's raining, It's pouring";
    levelup(23);
  }
  if (bulletsDodged == 599) {
    output.innerHTML = "You should fear death";
    levelup(32);
  }
  if (bulletsDodged == 1599) {
    output.innerHTML = "AHHHHHHHH";
    levelup(40);
  }
  if (bulletsDodged == 2499) {
    output.innerHTML = "You're unkillable";
    gameBeaten = true;
    clearArray = [];
    bullets = clearArray; // Clear all bullets
  }

  // Update bullets dodged
  bulletsDodgedOutput.innerHTML = bulletsDodged;

}

// Display screen for leveling up
async function levelup(restockAmmout) {
  clearArray = [];
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
    level++;
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
    if (tumbleweeds[n].x > 800 + TUMBLEWEED_SIZE || tumbleweeds[n].x < 0 - TUMBLEWEED_SIZE) {
      tumbleweeds.splice(n, 1)
      n--
    }
    else {
      tumbleweeds[n].x += tumbleweeds[n].speed;
    }

  }
}
