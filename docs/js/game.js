class Game {
  constructor() {
// Get references to various elements in the HTML document
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    
// Create a player and initialize game properties
    this.player = new Player(this.gameScreen, 200, 500, 20, 20, "./docs/images/snake-body4.png");
    this.height = 500;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.gameIsOver = false;
    this.loadingObstacle = false;

// Retrieve the high score from local storage or set it to 0 if it doesn't exist
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
    this.highScoreContainer = document.getElementById('high-score-container')

// This represents the Score Container
    this.scoreContainer = document.getElementById('score-container')
  }

  start() {
// Set the dimensions of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

// Hide the start screen / display the game screen / display the score and highscore
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.scoreContainer.style.display = 'block'
    this.highScoreContainer.style.display='block'

// Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

// Update the game's state and elements
    this.update();

// Continue the game loop using requestAnimationFrame
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
// Get score and high score elements
    let scoreElement = document.getElementById("score");
    let highScoreElement = document.getElementById("high-score");

// Update the displayed scores
    scoreElement.innerHTML = this.score;
    highScoreElement.innerHTML = this.highScore;

// Move the player
    this.player.move();

// Iterate through obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

// Check for collisions between player and obstacles
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.score = this.score + 10;

// Update the high score if the current score is higher
        if (this.score > this.highScore) {
          this.highScore = this.score;

// Store the new high score in localStorage
          localStorage.setItem('highScore', this.highScore);
        }
      }
    }

// Load new obstacles if there are none and it's not currently loading
    if (!this.obstacles.length && !this.loadingObstacle && !this.gameIsOver) {
      this.loadingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.loadingObstacle = false;
      }, 0); // The zero value is for instantly display a new food when player eats the current food
    }

// Check for collisions with game screen boundaries
    const headRect = this.player.segments[0].getBoundingClientRect();
    const gameScreenRect = this.gameScreen.getBoundingClientRect();

    if (
      headRect.left <= gameScreenRect.left ||
      headRect.right >= gameScreenRect.right ||
      headRect.top <= gameScreenRect.top ||
      headRect.bottom >= gameScreenRect.bottom
    ) {
// End the game if there's a collision with boundaries
      this.endGame();
    }
  }

  endGame() {
    this.gameIsOver = true;

// Remove obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

// Get and play the game over audio when game ends
    const gameOverAudio = document.getElementById("game-over-audio");
    gameOverAudio.play();

// Show the game end screen
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    this.scoreContainer.style.display = 'block';
    this.highScoreContainer.style.display='block'
  }
}
