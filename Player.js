'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.image = new Image();
  this.image.src = "images/frog.png";
  this.height = 30;
  this.width = 30;
  this.x = parseFloat(canvas.width)/2 - 15;
  this.y = parseFloat(canvas.height) - 67.5;
  this.roadsup = 0;
}

Player.prototype.move = function (str) {
  if(str == 'right' && ((this.x + this.width + 20) < this.canvas.width)) {
    this.x += 20;
  }
  else if (str === 'left' && ((this.x - 20) > 0)) {
    this.x -= 20;
  }
}

Player.prototype.draw = function () {
  this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Player.prototype.uproad = function () {
  this.roadsup++;
}