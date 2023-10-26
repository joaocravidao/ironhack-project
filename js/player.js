// Player class represents the snake controlled by the player
class Player {
  constructor(gameScreen, initialLeft, initialTop, segmentWidth, segmentHeight, imgSrc) {
    this.gameScreen = gameScreen;
    this.segments = [];
    this.segmentWidth = segmentWidth;
    this.segmentHeight = segmentHeight;
    this.directionX = 0; // Initial movement direction along the X-axis
    this.directionY = -5; // Initial movement direction along the Y-axis
    this.currentDirection = null; // Current direction of the snake
    
    // Create and add the initial head segment
    const head = this.createSegment(initialLeft, initialTop, imgSrc);
    this.segments.push(head);
  }

  // Create a new segment for the player's body
  createSegment(left, top, imgSrc) {
    const element = document.createElement("img");
    element.src = imgSrc; // Set the image source
    element.style.position = "absolute";
    element.style.width = `${this.segmentWidth}px`;
    element.style.height = `${this.segmentHeight}px`;
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    this.gameScreen.appendChild(element);
    return element;
  }

  move() {
    // Move each segment starting from the tail to the head
    for (let i = this.segments.length - 1; i > 0; i--) {
      const prevSegment = this.segments[i - 1];
      const segment = this.segments[i];
      segment.style.left = prevSegment.style.left;
      segment.style.top = prevSegment.style.top;
    }

    // Move the head segment based on directionX and directionY
    const head = this.segments[0];
    head.style.left = `${parseInt(head.style.left) + this.directionX}px`;
    head.style.top = `${parseInt(head.style.top) + this.directionY}px`;

    // Ensure the player's head stays within the game screen
    if (parseInt(head.style.left) < 0) {
      head.style.left = "0px";
    }

    if (parseInt(head.style.top) < 0) {
      head.style.top = "0px";
    }

    if (parseInt(head.style.left) > this.gameScreen.offsetWidth - this.segmentWidth) {
      head.style.left = `${this.gameScreen.offsetWidth - this.segmentWidth - 0}px`;
    }

    if (parseInt(head.style.top) > this.gameScreen.offsetHeight - this.segmentHeight) {
      head.style.top = `${this.gameScreen.offsetHeight - this.segmentHeight - 0}px`;
    }
  }

  // Function to grow the player by adding a new segment
  grow() {
    const tail = this.segments[this.segments.length - 1];
    const newLeft = parseInt(tail.style.left);
    const newTop = parseInt(tail.style.top);
    const newSegment = this.createSegment(newLeft, newTop, "./images/snake-body4.png"); // Add a new segment
    this.segments.push(newSegment);
  }

  // Function to check if the player's head collided with an obstacle
  didCollide(obstacle) {
    const head = this.segments[0];
    const playerRect = head.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      this.grow(); // Grow the player's body

      const eatSound = document.getElementById("eatSound");
      eatSound.play(); // Play an eating sound

      return true;
    }
    return false;
  }
  reset(initialLeft, initialTop, imgSrc) {
   for (let i = this.segments.length - 1; i > 0; i--) {
     this.segments[i].remove();
   }
   this.segments = [this.segments[0]]; // Keep the head
   // Update the head's position and image source
   const head = this.segments[0];
   //head.src = imgSrc;
   head.style.left = `${initialLeft}px`;
   head.style.top = `${initialTop}px`;
  }
}