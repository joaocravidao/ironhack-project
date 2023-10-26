// This function runs when the window has finished loading
window.onload = function () {
  // Get references to the start and restart buttons and initialize the game variable
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  let highScoreContainer = document.getElementById('high-score-container')
  let scoreContainer = document.getElementById('score-container')

  // Add a click event listener to the "Start Game" button
  startButton.addEventListener("click", function () {
    // Hide or remove the game intro elements
    const gameIntro = document.getElementById("game-intro");
    gameIntro.style.display = "none"; // You can use "none" to hide or "remove()" to remove the element

    // Countdown code here
    const countdownContainer = document.getElementById("countdown-container");
    const countdownTimer = document.getElementById("countdown-timer");
    let countdown = 3; // Set the initial countdown value

    function startCountdown() {
      countdownContainer.style.display = "block";
      countdownTimer.textContent = countdown;
      highScoreContainer.style.display='none'
      scoreContainer.style.display='none'


      const countdownInterval = setInterval(function () {
        countdown--;
        countdownTimer.textContent = countdown;

        if (countdown <= 0) {
          clearInterval(countdownInterval);
          countdownContainer.style.display = "none"; // Hide the countdown container
          startGame(); // Start the game when the countdown reaches zero
        }
      }, 1000); // Update the countdown every second (1000ms)
    }

    startCountdown(); // Start the countdown when you click the "Start Game" button
  });

  // Add a click event listener to the "Restart" button
    restartButton.addEventListener("click", function() {
    console.log("Restarting the game");
    if(game){
      game.gameScreen.innerHTML = '';
      game.player.reset(200, 500, "./docs/images/snake-head4.png")
    }

    startGame();
  });

    // Function to start the game
  function startGame() {
    console.log("start game");
    game = new Game(); // Create a new game instance first
    game.gameEndScreen.style.display = "none"; // Then hide the game end screen
    highScoreContainer.style.display='none'
    game.start(); // Finally, start the game
  }

  // Function that handles key events
  function handleKeydown(event) {
    const key = event.key;

    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeys.includes(key)) {
      event.preventDefault();
      console.log(`Key pressed: ${key}`);

      if (game) {
        // Check if the new direction is not opposite to the current direction
        if (key === "ArrowLeft" && game.player.currentDirection !== "ArrowRight") {
          game.player.directionX = -5;
          game.player.directionY = 0;
          game.player.currentDirection = key;
        } else if (key === "ArrowUp" && game.player.currentDirection !== "ArrowDown") {
          game.player.directionX = 0;
          game.player.directionY = -5;
          game.player.currentDirection = key;
        } else if (key === "ArrowRight" && game.player.currentDirection !== "ArrowLeft") {
          game.player.directionX = 5;
          game.player.directionY = 0;
          game.player.currentDirection = key;
        } else if (key === "ArrowDown" && game.player.currentDirection !== "ArrowUp") {
          game.player.directionX = 0;
          game.player.directionY = 5;
          game.player.currentDirection = key;
        }
      }
    }
  }

  // Retrieve the high score from localStorage
  let highScore = localStorage.getItem('highScore') || 0;

  // Function to update the score
  function updateScore(newScore) {
    score = newScore;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
    }
    document.getElementById('score').textContent = score;
    document.getElementById('high-score').textContent = highScore;
  }

  // Add a keydown event listener to handle key presses
  window.addEventListener("keydown", handleKeydown);
};
