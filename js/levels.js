// LEVELS

//LEVEL 1 ---------------------
let TUMBLEWEED_SIZE = 50;
let tumbleweeds = populateTumbleweed(12);
function level1() {
    // Blank the canvas
    background("rgb(241, 205, 138)");

    // Move player
    playerMovement();
    // Draw Player
    //if (!gameover && !gameBeaten) {
    fill('rgb(119, 57, 7)');
    rect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE, 'fill');
    //}

    // Draw Bullets
    fill('black')
    bulletDraw(bullets);
    // Move Bullets
    bulletMove(bullets);

    console.log(bulletsDodged);

    if (bulletsDodged >= 20) {
        // Draw tumbleweed
        tumbleweedDraw(tumbleweeds);
        // Move tumbleweed
        tumbleweedMove(tumbleweeds);
    }

    // Check if player got hit
    playerHitCheck(player, bullets);
    playerHitCheck(player, tumbleweeds);
}

//LEVEL 2 ---------------------
tumbleweeds = populateTumbleweed(12);
function level2() {
    // Blank the canvas
    background("rgb(241, 205, 138)");

    // Move player
    playerMovement();
    // Draw Player
    if (!gameover && !gameBeaten) {
    fill('rgb(119, 57, 7)');
    rect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE, 'fill');
    }

    // Draw Bullets
    fill('black')
    bulletDraw(bullets);
    // Move Bullets
    bulletMove(bullets);

    console.log(bulletsDodged);

    if (bulletsDodged >= 20) {
        // Draw tumbleweed
        tumbleweedDraw(tumbleweeds);
        // Move tumbleweed
        tumbleweedMove(tumbleweeds);
    }

    // Check if player got hit
    playerHitCheck(player, bullets);
    playerHitCheck(player, tumbleweeds);
}

//LEVEL 3 ---------------------
function level3() {
    console.log
}

//LEVEL 4 ---------------------
function level4() {
    console.log
}

//LEVEL 5 ---------------------
function level5() {
    console.log
}