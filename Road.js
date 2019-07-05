'use strict';

function Road(canvas, y, type) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.type = type;
  this.x = -10;
  this.y = y;
  this.height = 40;
  this.width = 500;
  if (this.type == 'offroad') {
    this.color = 'green';
  }
  else if (this.type == 'road') {
    this.color = 'grey';
  }
}

Road.prototype.drawroad = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Road.prototype.advance= function() {
  this.y += 40;
}

