// GAME MOVEMENT FUNCTIONS

// Draw bullets or destroy and replace
function bulletDraw(bullets) {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y >= 600) {
      bullets.splice(i, 1);
      i--;
      bullets.push({ x: randomInt(0, 801), y: -10, speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX) });
      bulletsDodged++;
      // If game isn't over increase level
      if (!gameover) {
        outputMessageHandler(bulletsDodged);
      }
    }
    else {
      rect(bullets[i].x, bullets[i].y, BULLETS_SIZE, BULLETS_SIZE, 'fill');
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
    tempArray.push({ x: randomInt(0, 801), y: -10, speed: randomInt(BULLETS_SPEED_MIN, BULLETS_SPEED_MAX) });
  }
  return tempArray;
}

// Check if player hit by bullet
function playerHitCheck(player, bullets) {
  for (let i = 0; i < bullets.length; i++) {
    if (squareCollide(player, bullets[i], PLAYER_SIZE, BULLETS_SIZE)) {
      player.x = -100;
      player.y = -100;
      gameover = true;
    }
  }
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

// Update message on HTML and increase difficulty
let output = document.getElementById('output'); // HTML El to update level
let bulletsDodgedOutput = document.getElementById('bulletsDodgedOutput'); // HTML El to update dodged
function outputMessageHandler(bulletsDodged) {
  if (bulletsDodged == 99) {
    output.innerHTML = "And so it begins";
    levelup(17);
  }
  if (bulletsDodged == 199) {
    output.innerHTML = "It's raining, It's pouring";
    levelup(23);
  }
  if (bulletsDodged == 599) {
    output.innerHTML = "You should fear death";
    levelup(27);
  }
  if (bulletsDodged == 999) {
    output.innerHTML = "PRAY";
    levelup(35);
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