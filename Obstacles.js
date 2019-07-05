'use strict';

function Obstacles(canvas, init, y, rand, index, vel) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.image = new Image();
  this.image.src = "images/car1.png"
  this.y = y;
  if ((index%2) == 0) {
    this.direction = 1;
    if (init) {
      this.x = rand;
    } 
    else this.x = -100;
  } 
  else {
    this.direction = -1;
    if (init){
      this.x = rand
    } 
    else this.x = canvas.width + 100;
  }
  this.velocity = vel;
  this.height = 35;
  this.width = 50;
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