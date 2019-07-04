'use strict';

function Game(canvas) {
  this.player = null;
  this.obstacles = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
  this.level = 1;
  this.score = 0;
  this.probability = 0.9;
  this.velobstacles = 2;
  this.name = null;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  var init = true;
  var filaini = 0;
  var numeroelem = 25;
  this.randomObstacles(filaini, numeroelem);
  init = false;
  var rand = 0;

  var loop = () => {
    if (Math.random() > this.probability) {
      var index = Math.floor(Math.random()*18);
      if ((index%6) != 0) {
      var y = (this.canvas.height-70) - (index*40) + (this.player.roadsup*40);
        var newObstacle = new Obstacles(this.canvas, init, y, rand, index, this.velobstacles);
        this.obstacles[index].push(newObstacle);
      }
    }
    console.log('loop')
    this.update();
    this.clear();
    this.draw();
    this.cheekCollisions();
    this.checkObstacleScreen();
    if(!this.isGameOver) {
      requestAnimationFrame(loop);
    }
    else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.onGameOver();
    }
  }
  requestAnimationFrame(loop);
}

Game.prototype.update = function () {
  //Erase
  if(this.player.roadsup%6 === 0 && this.player.roadsup != 0){
    this.player.roadsup -= 6;
    this.level++;
    this.erase();
    if (this.level%2 === 0){
      this.velobstacles += 0.05;
    }
    else {
      this.probability = this.probability - 0.01;
    }
  }
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
  this.obstacles.forEach((arr) => {
    arr.forEach((obstacle) => {
      var rightLeft = this.player.x + this.player.width >= obstacle.x;
      var leftRight = this.player.x <= obstacle.x + obstacle.width;
      var bottomTop = this.player.y + this.player.height >= obstacle.y;
      var topBottom = this.player.y <= obstacle.y + obstacle.height;
      if(rightLeft && leftRight && bottomTop && topBottom) {
        this.isGameOver = true;
      }
    });
  });
}

Game.prototype.gameOverCallBack = function(callback) {
  this.onGameOver = callback;
}

// Erase
Game.prototype.erase = function() {
  this.obstacles.splice(0, 6);
  for(var i = 12; i < 18; i++) {
    this.obstacles.push([]);
  }
  this.randomObstacles(12, 20);
}

Game.prototype.randomObstacles = function (filaini, numeroelem) {
  var init1 = true;
  for (var i = 0; i < numeroelem; i++) {
    var index = Math.floor(Math.random()*(18-filaini)+filaini);
    if ((index%6) != 0) {
      var rand = Math.floor(Math.random()*600);
      var y = (this.canvas.height-70) - (index*40) + (this.player.roadsup*40);   
      var newObstacle = new Obstacles(this.canvas, init1, y, rand, index, this.velobstacles);
      this.obstacles[index].push(newObstacle);
    }
  }
}

Game.prototype.increaseScore = function () {
  this.score += 5*(Math.floor((this.level+1)/2));;
}

Game.prototype.checkObstacleScreen = function() {
  this.obstacles.forEach((array, arrayIndex) => {
    array.forEach((obstacle, obsIndex) => {
      if(obstacle.x > this.canvas.width + 200 || obstacle.x < -200) {
        this.obstacles[arrayIndex].splice(obsIndex, 1);
      }
    })
  })
}