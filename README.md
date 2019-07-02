# Frogger

## Description
Tenemos un personaje que representara a una rana y tiene que conseguir cruzar una carretera sin que sea atropellada. En la carretera saldran aleatoriamente coches y si hay contacto la rana se considera atropellada y se acaba el juego. 


## MVP (DOM - CANVAS)
La base del juego es crear la rana que se mueva con las 4 flechas del teclado y que le salgan obstaculos aleatoriamente y en ambos sentidos por los carriles que va a cruzar.


## Backlog
Para dificultar el juego vamos a hacer que cuando la rana avanze, la pantalla se mueva también con ella, de manera que vayamos avanzando carriles y nos salgan nuevos obstaculos. De este modo vamos a poder poner un contador de scoore que ira sumando conforme vaya esquivando vehiculos.

## Data structure
### main
```
fuction builDom
function inicialScreen 
function gameScreen 
fucntion gameOverScreen
function highScoreScreen
```

### Game
```
function Game(canvas) {
  player = null;
  obstacles = [];
  isGameOver = false;
  cavas = canvas;
  ctx = this.canvas.getContext('2d);
  onGameOver = null;
}
Game.startGame
Game.update
Game.clear
Game.draw
Game.cheekCollisions
Game.gameOverCallBack
```

### Player
```
function Player(canvas) {
  canvas = canvas;
  ctx = canvas.getContext('2d');
  heigth = 20;
  width = 20;
  x = (canvas.width/2);
  y = 20;
  color = 'green';
}
Player.move
PLayer.draw 
```

### Obstacles 
```
function Obstacles(canvas, direction) {
  canvas = canvas;
  ctx = canvas.getContext('2d');
  x = random;
  y = random(0 or canvas.width);
  velocity = 10;
  direction = direction;
  color = 'red';
  heigth = 20;
  width = 50;
}
Obstacles.move
Obstacles.draw
```


## States y States Transitions
- inicialScreen: pantalla de inicio con el título del juego, un input para introducir un nombre de usuario y con dos botones, 'Start' para empezar el juego y 'High Scores', para acceder a la pantalla de high scores.

- gameScreen: pantalla del juego, se puede salir de ella cuando atropellan a la rana y salta a la pantalla de game over.

- gameOverScreen: pantalla de fin del juego, en ella encontramos dos botones, 'Restart' para volver a jugar y 'High Scores', para acceder a la pantalla de high scores.

- highScoreScreen: pantalla donde veremos los 5 mejores registros del juego, con un boton debajo, 'Back' para volver a la pantalla de inicio.


## Task
- Create archives
- Copy BoilerPlate
- Setup git and github
- Create 4 screens
- Transition between screens
- Create Game Loop
- Create player
- Move player
- Create obstacles
- Check collisions
- Game over


## Links


### Trello
[Link URL](https://trello.com/b/uL5NE9rs/frogger)


### Git
[Link URL](https://github.com/gmontanee/Frogger.git)


### Slides
[Link URL](http://slides.com)