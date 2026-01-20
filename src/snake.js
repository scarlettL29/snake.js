/**
 * Represents a snake
 * @constructor
 * @param {{x:Number, y: Number}} field, size of the field
 */
function Snake(field = { x: 20, y: 20 }) {
  this.field = field;
  this.respawn();
} 

/**
 * Return the positions of the snake
 * @returns {[{x: Number, y: Number}]} array of jsons
 */
Snake.prototype.get = function() {
  return this.snake;
};

/**
 * Set the direction of the snake
 * @param {Directions} direction, direction of the snake
 */
Snake.prototype.setDirection = function(direction) {
  //if directions are opposite the move is not valid
  if (
    OppositeDirections[0].includes(this.direction) &&
    OppositeDirections[0].includes(direction)
  )
    return;
  if (
    OppositeDirections[1].includes(this.direction) &&
    OppositeDirections[1].includes(direction)
  )
    return;
  this.direction = direction;
};

/**
 * Move the snake by one block
 */
Snake.prototype.move = function() {
  for (var i = this.size - 1; i > 0; i--) {
    this.snake[i] = { x: this.snake[i - 1].x, y: this.snake[i - 1].y };
  }
  this.snake[0].x += this.direction.x;
  this.snake[0].y += this.direction.y;

  this.checkDeath();
};





function update() {
    snake.move();

    if (snake.isDead()) {
        // This line makes the pop-up appear
        document.getElementById("good").style.display = "flex";
        return; // Stop moving the snake
    }
    
    // ... rest of your drawing code ...
}








/**
 * Grow the snake by one
 */
Snake.prototype.grow = function() {
  this.size++;
};

/**
 * Check if the snake is still alive and return true if it is, false otherwise
 * @return {boolean}, true if the snake is alive false otherwise
 */
Snake.prototype.checkDeath = function() {
  if (
    this.snake[0].x < 0 ||
    this.snake[0].x >= this.field.x ||
    this.snake[0].y < 0 ||
    this.snake[0].y >= this.field.y
  ) {
    this.alive = false;
  }
  for (var i = 1; i < this.snake.length; i++) {
    if (
      this.snake[0].x == this.snake[i].x &&
      this.snake[0].y == this.snake[i].y
    ) {
      this.alive = false;
    }
  }
  return !this.alive;
};

/**
 * Respawn the snake
 */
Snake.prototype.respawn = function() {
  this.alive = true;
  this.size = 3;
  this.direction = getRandomDirection();
  this.snake = [
    {
      x: Math.floor(Math.random() * this.field.x),
      y: Math.floor(Math.random() * this.field.y)
    }
  ];
  for (var i = 1; i < this.size; i++) {
    this.snake[i] = {
      x: this.snake[0].x - this.direction.x * i,
      y: this.snake[0].y - this.direction.y * i
    };
  }
};

/**
 * @return {boolean} true if the snake is still alive, false otherwise
 */
Snake.prototype.isAlive = function() {
  return this.alive;
};


/**
 * Return true if the snake is dead, false otherwise
 * @return {boolean} true if the snake is dead, false otherwise
 */
Snake.prototype.isDead = function() {
  return !this.alive;
};

/**
 * Return the size of the snake
 * @return {Number} size of the snake
 */
Snake.prototype.getSize = function() {
  return this.size;
};

/**
 * Return true if the snake occupy that cell
 * @param {{x: Number, y: Number}}} pos
 */
Snake.prototype.isOn = function(pos) {
  for (var i = 0; i < this.snake.length; i++) {
    if (this.snake[i].x == pos.x && this.snake[i].y == pos.y) {
      return true;
    }
  }
  return false;
};

const Directions = {
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 }
};

const OppositeDirections = [
  [Directions.LEFT, Directions.RIGHT],
  [Directions.DOWN, Directions.UP]
];

function getRandomDirection() {
  var x = Math.round(Math.random()) * 2 - 1;
  var y = 0;
  while (x == 0 && y == 0) var y = Math.round(Math.random()) * 2 - 1;

  return { x: x, y: y };
}


