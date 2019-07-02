'use strict';

function main () {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createInitialScreen() {
    var initialScreen = buildDom(`
      <section>
        <h1>Frogger</h1>
        <button id="start-game">Start Game</button>
        <button id="high-scores">High Scores</button>
      </section>
      `);
      var startButton = initialScreen.querySelector('#start-game');
      var highScoreButton = initialScreen.querySelector('#high-scores');
      startButton.addEventListener('click',createGameScreen);
      highScoreButton.addEventListener('click',createHighScoreScreen);
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
      <section>
        <canvas width="500" height="600"></canvas>
      </section>
    `);
    var canvasElement = document.querySelector('canvas');
    var  gameInstance = new Game(canvasElement);
    //is GameOver?
    gameInstance.startGame();
    document.addEventListener('keydown', function(event){
      if(event.key === 'ArrowUp') {
        gameInstance.player.move('up');
      }
      else if(event.key === 'ArrowRight') {
        gameInstance.player.move('right');
      }
      else if(event.key === 'ArrowDown') {
        gameInstance.player.move('down');
      }
      else if(event.key === 'ArrowLeft') {
        gameInstance.player.move('left');
      }
    });
  }

  function  createGameOverScreen() {
    var initialScreen = buildDom(`
    <section>
      <h1>Frogger</h1>
      <button id="restart-game">Restart Game</button>
      <button id="high-scores">High Scores</button>
    </section>
    `);
    var restartButton = initialScreen.querySelector('#restart-game');
    var highScoreButton = initialScreen.querySelector('#high-scores');
    restartButton.addEventListener('click',createGameScreen);
    highScoreButton.addEventListener('click',createHighScoreScreen);
  }

  function createHighScoreScreen() {
    var highScoreScreen = buildDom (`
    <section>
    <h1>High Scores</h1>
    <button>Back</button>
    </section>
    `);
    var backButton = highScoreScreen.querySelector('button');
    backButton.addEventListener('click', createInitialScreen);
  }
  createInitialScreen();
}
window.addEventListener('load',main);