const util = require('./Util');

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
