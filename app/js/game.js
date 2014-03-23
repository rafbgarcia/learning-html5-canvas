var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var ctx = canvas.getContext('2d');
var SPEED = 15;


var Key = {
  pressed: {},
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
};

Key.isDown = function(keyCode) {
  return Key.pressed[keyCode];
};

Key.onKeyDown = function(event) {
  return Key.pressed[event.keyCode] = true;
};

Key.onKeyUp = function(event) {
  delete Key.pressed[event.keyCode];
};



function Ship(x, y) {
  this.pos = {x: x, y: y};
  this.size = {w: 100, h: 100};
  this.bullets = [];
  var image = new Image();
  image.src = "/images/spaceship.svg";

  var self = this;
  image.onload = function() {
    self.draw();
  };

  this.draw = function () {
    ctx.drawImage(image, this.pos.x, this.pos.y, this.size.w, this.size.h);
  };

  this.moveLeft = function() {
    this.pos.x -= SPEED;
  };

  this.moveRight = function() {
    this.pos.x += SPEED;
  };

  this.moveUp = function() {
    this.pos.y -= SPEED;
  };

  this.moveDown = function() {
    this.pos.y += SPEED;
  };

  this.update = function () {
    if(Key.isDown(Key.LEFT)) this.moveLeft();
    if(Key.isDown(Key.RIGHT)) this.moveRight();
    if(Key.isDown(Key.UP)) this.moveUp();
    if(Key.isDown(Key.DOWN)) this.moveDown();

    if(Key.isDown(Key.SPACE)) {
      var bullet = new Bullet(this.pos.x + 40, this.pos.y);
      this.bullets.push(bullet);
    }

    for(var i in this.bullets) {
      this.bullets[i].update();
      this.bullets[i].draw();
    }
  };
}

function Bullet(x, y) {
  var w = 20, h = 20;

  this.pos = {x: x, y: y};
  this.size = {w: w, h: h};
  var image = new Image();
  image.src = "/images/bullet.png";

  var self = this;
  image.onload = function() {
    self.draw();
  };

  this.draw = function () {
    ctx.drawImage(image, self.pos.x, self.pos.y, self.size.w, self.size.h);
  };

  this.update = function() {
    self.pos.y -= 10;
  };

}


Game = {};

Game.start = function () {
  Game.ship = new Ship(240, 300);
};

Game.draw = function () {
  Game.ship.draw();
};

Game.update = function () {
  Game.ship.update();
};

document.body.addEventListener('keydown', Key.onKeyDown, false);
document.body.addEventListener('keyup', Key.onKeyUp, false);

Game.start();

setInterval(function() {
  ctx.clearRect(0, 0, 1000, 1000);

  Game.update();
  Game.draw();
}, 30);
