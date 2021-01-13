function level1() {
    // Blank the canvas
    background("beige");

    // Move player
    playerMovement();
    // Draw Player
    if (!gameover && !gameBeaten) {
    fill('red');
    rect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE, 'fill');
    }

    // Draw Bullets
    fill('black')
    bulletDraw(bullets);

    // Move Bullets
    bulletMove(bullets);

}