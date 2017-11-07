const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  const gameView = new GameView(ctx);
  gameView.start();
});
