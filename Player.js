'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.height = 30;
  this.width = 30;
  this.x = parseFloat(canvas.width)/2 - 15;
  this.y = parseFloat(canvas.height) - 67.5;
  this.color = 'green';
}

Player.prototype.move = function (str) {
  if(str == 'up') {
    this.y -= 40;
  }
  else if(str == 'right') {
    this.x += 10;
  }
  else if(str == 'down') {
    this.y += 40;
  }
  else if (str === 'left') {
    this.x -= 10;
  }
  console.log(this.x, this.y);
}

Player.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}