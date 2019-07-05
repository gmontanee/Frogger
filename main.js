'use strict';

function main () {
  var mainElement = document.querySelector('#site-main');
  var lvl = 1;
  var player = {name:null, score: 0};

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
        <div class="buttondiv">
          <input type="text" id="nickname" placeholder="Nickname" />
          <button class="start-game">Start Game</button>
        </div>
      </section>
    </div>
      `);
      var startButton = initialScreen.querySelector('.start-game');
      var nickname = document.querySelector('#nickname');  
      function listenerClick () {
        if (!(nickname.value === "")) {
          player.name = nickname.value;
          createGameScreen();
          startButton.removeEventListener('click', listenerClick)
        }
      }
      function listenerKey(event) {
        if (event.key === 'Enter' && !(nickname.value === "")) {
          player.name = nickname.value;
          createGameScreen();
          document.removeEventListener('keydown', listenerKey)
        }
      }
      startButton.addEventListener('click',listenerClick);
      document.addEventListener('keydown', listenerKey);
      
      // var highScoreButton = initialScreen.querySelector('.high-scores');
      // highScoreButton.addEventListener('click',createHighScoreScreen);
      // document.addEventListener('keydown', function(event) {
      //   if (event.key === 'h') {
      //     createHighScoreScreen();
      //   }
      // });
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
    <div class="container">
      <section class="game-screen">
        <canvas width="450" height="550"></canvas>
      </section>
    </div>
    `);
    var canvasElement = document.querySelector('canvas');
    var gameInstance = new Game(canvasElement, player.name);
    gameInstance.gameOverCallBack(gameover);
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
        gameInstance.roads.forEach(function(road) {
          road.advance();
        });
      }
      else if(event.key === 'ArrowRight') {
        gameInstance.player.move('right');
      }
      else if(event.key === 'ArrowLeft') {
        gameInstance.player.move('left');
      }
    });
    function gameover (){
      console.log(gameInstance);
      createGameOverScreen();
    }
  }

  function  createGameOverScreen() {
    var initialScreen = buildDom(`
    <div class="container">
      <section>
        <h1>FROGGER</h1>
        <div class="scorediv">
          <h2>${player.name} your score is:</h2>
        </div>
        <div class="scorediv">
          <p>${player.score}</p>
        </div>
        <div class="buttondiv">
          <button class="restart-game">Restart Game</button>
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
    // var highScoreButton = initialScreen.querySelector('.high-scores');
    // highScoreButton.addEventListener('click',createHighScoreScreen);
    // document.addEventListener('keydown', function(event) {
    //   if (event.key === 'h') {
    //     createHighScoreScreen();
    //   }
    // });
  }

  // function createHighScoreScreen() {
  //   var highScoreScreen = buildDom (`
  //   <div class="container">
  //     <section>
  //       <h1>FROGGER</h1>
  //       <h2>High Scores</h2>
  //       <div class="buttondiv">
  //         <button>Back</button>
  //       </div>
  //     </section>
  //   </div>
  //   `);
  //   var backButton = highScoreScreen.querySelector('button');
  //   backButton.addEventListener('click', createInitialScreen);
  //   document.addEventListener('keydown', function(event) {
  //     if (event.key === 'b') {
  //       createInitialScreen();
  //     }
  //   });
  // }
  function scoreupdate (scogam) {
    return player.score = scogam;
  }
  function lvlupdate (lvlgame) {
    return lvl = lvlgame;
  }
  createInitialScreen();
}
window.addEventListener('load',main);