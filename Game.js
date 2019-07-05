'use strict';

function Game(canvas, name) {
  this.player = null;
  this.obstacles = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  this.roads = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
  this.level = 1;
  this.score = 0;
  this.probability = 0.9;
  this.velobstacles = 2;
  this.name = name;
  this.gameSong = new Audio('audio/froggersong.ogg');
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  var init = true;
  var filaini = 0;
  var numeroelem = 25;
  this.randomObstacles(filaini, numeroelem);
  this.newroads(0);
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
    this.update();
    this.clear();
    this.draw();
    this.cheekCollisions();
    this.checkObstacleScreen();
    if(!this.isGameOver) {
      this.gameSong.play();
      requestAnimationFrame(loop);
    }
    else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.gameSong.pause();
      // delete Game;
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
      this.velobstacles += 0.1;
    }
    else {
      this.probability = this.probability - 0.015;
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
  this.roads.forEach(function (eachRoad) {
    eachRoad.drawroad();
  });
  this.player.draw();
  this.obstacles.forEach(function(arr) {
    arr.forEach(function(obj) {
      obj.draw();
    });
  });
  this.drawscore();
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
  this.roads.forEach(function (roads) {
    roads.y -= 240;
  });
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

Game.prototype.newroads = function(inicio) {
  for(var i = inicio; i < 18; i++) {
    var y = (this.canvas.height-73) - (i*40);
    if (i%6 === 0) {
      var road = new Road(this.canvas, y, 'offroad');
    }
    else {
      var road = new Road(this.canvas, y, 'road');
    }
    this.roads.push(road);
  }
}

Game.prototype.drawscore = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, this.canvas.height-30, this.canvas.width, 30);
  this.ctx.fillStyle = 'white';
  this.ctx.font = "20px Arial";
  this.ctx.fillText(`Level: ${this.level}`, 40, this.canvas.height-7.5);
  this.ctx.font = "20px Arial";
  this.ctx.fillText(`Score: ${this.score}`, this.canvas.width-110, this.canvas.height-7.5);
}