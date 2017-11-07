const movingObj = require('./movingObject');
const util = require('./Util');
const Bullet = require('./bullet');



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
