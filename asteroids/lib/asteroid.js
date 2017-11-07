const movingObj = require('./movingObject');
const util = require('./Util');
const Ship = require('./ship');


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
