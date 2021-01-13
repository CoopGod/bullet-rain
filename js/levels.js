// LEVELS

//LEVEL 1 ---------------------
let TUMBLEWEED_SIZE = 50;
let tumbleweeds = [
    {x: -20, y: 300, speed: 7, size: TUMBLEWEED_SIZE},
    {x: -520, y: 400, speed: 6, size: TUMBLEWEED_SIZE},
    {x: 830, y: 200, speed: -7, size: TUMBLEWEED_SIZE},
    {x: 4830, y: 400, speed: -7, size: TUMBLEWEED_SIZE},
    {x: -330, y: 300, speed: 8, size: TUMBLEWEED_SIZE},
    {x: 1230, y: 250, speed: -7, size: TUMBLEWEED_SIZE},
    {x: 2030, y: 500, speed: -7, size: TUMBLEWEED_SIZE},
    {x: -2230, y: 100, speed: 7, size: TUMBLEWEED_SIZE},

]
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