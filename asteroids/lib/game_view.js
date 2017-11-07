const Game = require('./game');
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
