'use strict';

function Obstacles(canvas, init, alt, rand) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.y = alt;
  if (((alt-60)%80) == 0) {
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
  this.velocity = 2;
  this.color = 'red';
  this.height = 35;
  this.width = 50;
}

Obstacles.prototype.move = function() {
  this.x += (this.velocity*this.direction);
}

Obstacles.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}