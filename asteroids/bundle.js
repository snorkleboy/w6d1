/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  const gameView = new GameView(ctx);
  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  window.setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);

  }, 20);
  this.bindKeyHandlers();
};
GameView.prototype.bindKeyHandlers = function(){
  let that=this;
  key('up', function(){
    that.game.ship.power([0,-10]);
  });
  key('left', function(){
    that.game.ship.power([-10,0]);
  });
  key('right', function(){
    that.game.ship.power([10,0]);
  });
  key('down', function(){
    that.game.ship.power([0,10]);
  });
  key('space', function(){
    that.game.ship.fireBullet();
  });
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const asteroid = __webpack_require__(3);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 20;
  this.bullets=[];
  this.asteroids = [];
  this.ship= new Ship(this.randomPosition(),this);

  for(let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.addAsteroids();
  }
}

Game.prototype.addAsteroids = function() {
  this.asteroids.push(new asteroid(this.randomPosition(), this));
};

Game.prototype.randomPosition = function () {
  const x = Math.random() * this.DIM_X;
  const y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 1000, 800);

  this.allObjects().forEach(function(ast) {
    ast.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(ast) {
    ast.move();
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] < 0) {
    pos[0] = this.DIM_X;
  }
  if (pos[0] > this.DIM_X) {
    pos[0] = 0;
  }
  if (pos[1] < 0) {
    pos[1] = this.DIM_Y;
  }
  if (pos[1] > this.DIM_Y) {
    pos[1] = 0;
  }
  return pos;
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship, this.bullets);
};

Game.prototype.checkCollisions = function () {
  let that = this;
  this.allObjects().forEach(function(obj1, idx1) {
    that.allObjects().forEach(function(obj2, idx2) {
      if (idx1 !== idx2 && obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (obj) {
  if ( !(obj instanceof Bullet) ){
    const idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
  } else {
    const idx = this.bullets.indexOf(obj);
    this.bullets.splice(idx, 1);
  }
};

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const movingObj = __webpack_require__(4);
const util = __webpack_require__(5);
const Ship = __webpack_require__(6);


function Asteroid(position, game) {
  const vel = util.randomVec(Math.random() * (12 - 2) + 2);
  this.COLOR = '#ccc';
  this.RADIUS = 15;
  const options = {
    pos: position,
    vel: vel,
    rad: this.RADIUS,
    col: this.COLOR,
    game: game
  };
  movingObj.call(this, options);
}
util.inherits(Asteroid, movingObj);



Asteroid.prototype.collideWith= function(otherobj){
  if (otherobj instanceof Ship){
    otherobj.relocate();
    this.game.remove(this);
  }
};


module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const util = __webpack_require__(5);

function MovingObject(optionshash){
  this.pos = optionshash['pos'];
  this.vel = optionshash['vel'];
  this.rad = optionshash['rad'];
  this.col = optionshash['col'];
  this.game = optionshash['game'];
}

MovingObject.prototype.draw= function draw(ctx){
  ctx.fillStyle= this.col;
  ctx.beginPath();
  ctx.arc(this.pos[0],this.pos[1], this.rad, 0,2*Math.PI);
  ctx.fill();
};

MovingObject.prototype.move = function move(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  return util.distance(this.pos, otherObject.pos) < this.rad + otherObject.rad;
};

MovingObject.prototype.collideWith = function(otherObject) {
};

module.exports= MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util={
  inherits(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  randomVec (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  distance (pos1, pos2) {
    return Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) +
               Math.pow(pos1[1] - pos2[1], 2)
    );
  }
};

module.exports = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const movingObj = __webpack_require__(4);
const util = __webpack_require__(5);
const Bullet = __webpack_require__(7);



function Ship(position, game) {
  const vel = [0,0];
  this.COLOR = '#000';
  this.RADIUS = 15;
  const options = {
    pos: position,
    vel: vel,
    rad: this.RADIUS,
    col: this.COLOR,
    game: game
  };
  movingObj.call(this, options);
}

util.inherits(Ship, movingObj);

Ship.prototype.relocate= function(){
  this.pos = this.game.randomPosition();
  this.vel=[0,0];
};
 Ship.prototype.power= function (impulse){
   this.vel[0]+=impulse[0];
   this.vel[1]+=impulse[1];

 };

Ship.prototype.fireBullet= function (){
  this.game.bullets.push( new Bullet(this.pos, this.vel, this.game));

};

module.exports = Ship;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const movingObj = __webpack_require__(4);
const util = __webpack_require__(5);
const Ship = __webpack_require__(6);
const asteroid = __webpack_require__(3);

function Bullet(position, velo, game) {
  [velo[0],velo[1]]=[velo[0]*2,velo[1]*2];
   const vel = velo;

  this.COLOR = 'red';
  this.RADIUS = 5;
  const options = {
    pos: position,
    vel: vel,
    rad: this.RADIUS,
    col: this.COLOR,
    game: game
  };
  movingObj.call(this, options);
}

util.inherits(Bullet, movingObj);



Bullet.prototype.collideWith = function(otherobj){
  const a = new asteroid();
  if (otherobj instanceof a.constructor) {
    this.game.remove(otherobj);
    this.game.remove(this);
  }
};


module.exports = Bullet;


/***/ })
/******/ ]);