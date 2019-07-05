'use strict';

function Obstacles(canvas, init, y, rand, index, vel) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.image = new Image();
  this.image.src = "images/carleft.png";
  this.height = 35;
  this.width = 54;
  this.y = y;
  if ((index%2) == 0) {
    this.direction = 1;
    this.image.src = "images/red-car-right.png";
    if (init) {
      this.x = rand;
    } 
    else this.x = -100;
  } 
  else {
    this.direction = -1;
    this.image.src = "images/red-car-left.png";
    if (init){
      this.x = rand
    } 
    else this.x = canvas.width + 100;
  }
  this.velocity = vel;
}

Obstacles.prototype.move = function() {
  this.x += (this.velocity*this.direction);
}

Obstacles.prototype.draw = function() {
  this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Obstacles.prototype.advance= function() {
  this.y += 40;
}