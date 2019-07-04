'use strict';

function main () {
  var mainElement = document.querySelector('#site-main');
  var sco = 0;
  var lvl = 1;

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createInitialScreen() {
    var initialScreen = buildDom(`
    <div class="container">
      <section>
        <h1>FROGGER</h1>
        <img src="images/frogg1.png" alt="">
        <form class="buttondiv">
          <input type="text" id="nickname"/>
          <button class="start-game">Start Game</button>
          <button class="high-scores">High Scores</button>
        </form>
      </section>
    </div>
      `);
      var startButton = initialScreen.querySelector('.start-game');    
      startButton.addEventListener('click',createGameScreen);
      document.addEventListener('keydown', function(event) {
        if (event.key === 's') {
          createGameScreen();
        }
      });
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          createGameScreen();
        }
      });
      var highScoreButton = initialScreen.querySelector('.high-scores');
      highScoreButton.addEventListener('click',createHighScoreScreen);
      document.addEventListener('keydown', function(event) {
        if (event.key === 'h') {
          createHighScoreScreen();
        }
      });
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
    <div class="container">
      <section>
        <div class="scorediv">
          <h2>Score:${sco}</h2>
          <h2>Level:${lvl}</h2>
        </div>
        <canvas width="450" height="550"></canvas>
      </section>
    </div>
    `);
    var canvasElement = document.querySelector('canvas');
    var  gameInstance = new Game(canvasElement);
    gameInstance.gameOverCallBack(createGameOverScreen);
    gameInstance.startGame();
    document.addEventListener('keydown', function(event){
      if(event.key === 'ArrowUp') {
        gameInstance.player.uproad();
        gameInstance.increaseScore();
        scoreupdate(gameInstance.score);
        lvlupdate(gameInstance.level);
        gameInstance.obstacles.forEach(function(obs) {
          obs.forEach(function(obs1) {
            obs1.advance();
          });
        });
      }
      else if(event.key === 'ArrowRight') {
        gameInstance.player.move('right');
      }
      else if(event.key === 'ArrowLeft') {
        gameInstance.player.move('left');
      }
    });
  }

  function  createGameOverScreen() {
    var initialScreen = buildDom(`
    <div class="container">
      <section>
        <h1>FROGGER</h1>
        <div class="scorediv">
          <h2>Score:${sco}</h2>
          <h2>Level:${lvl}</h2>
        </div>
        <div class="buttondiv">
          <button class="restart-game">Restart Game</button>
          <button class="high-scores">High Scores</button>
        </div>
      </section>
    </div>
    `);
    var restartButton = initialScreen.querySelector('.restart-game');
    restartButton.addEventListener('click',createGameScreen);
    document.addEventListener('keydown', function(event) {
      if (event.key === 'r') {
        createGameScreen();
      }
    });
    var highScoreButton = initialScreen.querySelector('.high-scores');
    highScoreButton.addEventListener('click',createHighScoreScreen);
    document.addEventListener('keydown', function(event) {
      if (event.key === 'h') {
        createHighScoreScreen();
      }
    });
  }

  function createHighScoreScreen() {
    var highScoreScreen = buildDom (`
    <div class="container">
      <section>
        <h1>FROGGER</h1>
        <h2>High Scores</h2>
        <div class="buttondiv">
          <button>Back</button>
        </div>
      </section>
    </div>
    `);
    var backButton = highScoreScreen.querySelector('button');
    backButton.addEventListener('click', createInitialScreen);
    document.addEventListener('keydown', function(event) {
      if (event.key === 'b') {
        createInitialScreen();
      }
    });
  }
  function scoreupdate (scogam) {
    return sco = scogam;
  }
  function lvlupdate (lvlgame) {
    return lvl = lvlgame;
  }
  createInitialScreen();
}
window.addEventListener('load',main);
