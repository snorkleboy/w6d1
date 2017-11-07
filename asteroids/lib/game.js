const asteroid = require('./asteroid');
const Ship = require('./ship');
const Bullet = require('./bullet');

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
