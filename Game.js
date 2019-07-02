'use strict';

function Game(canvas) {
  this.player = null;
  this.obstacles = [[],[],[],[],[],[],[],[],[],[],[],[]];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  var init = true;
  for (var i = 0; i < 25; i++) {
    var index = Math.floor(Math.random()*12);
    if (index != 6) {
      var y = (index*40) + 50;
      var rand = Math.floor(Math.random()*600);
      var newObstacle = new Obstacles(this.canvas, init, y, rand);
      this.obstacles[index].push(newObstacle);
    }
  }
  init = false;

  var loop = () => {
    if (Math.random() > 0.90) {
      var index = Math.floor(Math.random()*12);
      if (index != 6) {
        var y = (index*40) + 50;
        var newObstacle = new Obstacles(this.canvas, init, y, rand);
        this.obstacles[index].push(newObstacle);
      }
    }

    this.update();
    this.clear();
    this.draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

Game.prototype.update = function () {
  this.obstacles.forEach(function (arr) {
      arr.forEach(function(obj) {
        obj.move();
      });
  });
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacles.forEach(function(arr) {
    arr.forEach(function(obj) {
      obj.draw();
    });
  });
}

Game.prototype.cheekCollisions = function() {

}

Game.prototype.gameOverCallBack = function() {

}