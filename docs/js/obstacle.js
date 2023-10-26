// Obstacle class represents the food element in the game
class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 300 + 70); // Random X-coordinate within a range
    this.top = Math.floor(Math.random() * 300 + 70); // Random Y-coordinate within a range
    this.width = 25; // Width of the obstacle (food)
    this.height = 25; // Height of the obstacle (food)

// Create an image element to represent the obstacle (food)
    this.element = document.createElement("img");
    
    this.element.src = "./docs/images/food.png"; // Set the image source (food)
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`; // Set the initial X-coordinate
    this.element.style.top = `${this.top}px`; // Set the initial Y-coordinate

// Add the obstacle (food) element to the game screen
    this.gameScreen.appendChild(this.element);
  }

// Function to update the position of the obstacle
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

// Function to move the obstacle
  move() {
// Update the obstacle's position on the screen
    this.updatePosition();
  }
}