const movingObj = require('./movingObject');
const util = require('./Util');
const Ship = require('./ship');
const asteroid = require('./asteroid');

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
