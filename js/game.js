class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen, 200, 500, 35, 35, "./images/snake-body4.png");
    this.height = 500;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.gameIsOver = false;
    this.loadingObstacle = false;

    // Retrieve the high score from localStorage
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let scoreElement = document.getElementById("score");
    let highScoreElement = document.getElementById("high-score");

    scoreElement.innerHTML = this.score;
    highScoreElement.innerHTML = this.highScore;

    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.score++;

        // Update the high score if the current score is higher
        if (this.score > this.highScore) {
          this.highScore = this.score;

          // Store the new high score in localStorage
          localStorage.setItem('highScore', this.highScore);
        }
      }
    }

    if (!this.obstacles.length && !this.loadingObstacle && !this.gameIsOver) {
      this.loadingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.loadingObstacle = false;
      }, 200);
    }

    const headRect = this.player.segments[0].getBoundingClientRect();
    const gameScreenRect = this.gameScreen.getBoundingClientRect();

    if (
      headRect.left <= gameScreenRect.left ||
      headRect.right >= gameScreenRect.right ||
      headRect.top <= gameScreenRect.top ||
      headRect.bottom >= gameScreenRect.bottom
    ) {
      this.endGame();
    }
  }

  endGame() {
    this.gameIsOver = true;

    // Remove obstacles
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

    // Hide the game screen
    this.gameScreen.style.display = "none";

    // Show the game end screen
    this.gameEndScreen.style.display = "block";
  }
}
