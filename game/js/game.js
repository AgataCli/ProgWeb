(function() {
  const TAMX = 600;
  const TAMY = 800;
  var FPS = 100;
  let VEL = 1000;
  let PAUSE = 0;
  let TIME = 0;
  let ACEL = 1;
  let duracao = 5000;
  let rodar;

  const PROB_ENEMY_SHIP = 0.6;
  const PROB_ENEMY_UFO = 0.2;
  const PROB_ENEMY_METEOR_BIG = 0.4;
  const PROB_ENEMY_METEOR_SMALL = 0.13;

  let space, ship, life, gun, points;
  let enemies = [];
  let guns = [];
  let start = 0;
  let over = 0;

  function init() {
    space = new Space();
    ship = new Ship();
    life = new ShipLife();
    points = new Points();

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && start === 0) {
        rodar = window.setInterval(run, parseInt(VEL / FPS));
        start = start + 1;
      }
    });
  }

  window.addEventListener("keydown", (e) => {
      if (e.key === 'p' || e.key === 'P' && over != 1) PAUSE = !PAUSE;
    });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ship.mudaDirecao(-1);
    else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
  });

  window.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
      gun = document.querySelectorAll(".gun-ship");
      if (gun.length < 3) {
        guns.push(new ShipGun());
      }
      console.log(guns);
      console.log(enemies);
    }
  });

  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px";
    }
    move() {
      this.element.style.backgroundPositionY = `${parseInt(this.element.style.backgroundPositionY) + 1
        }px`;
    }
  }

  class Ship {
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }
    move() {
      if (this.direcao === 0)
        this.element.style.left = `${parseInt(this.element.style.left) - 2}px`;
      if (parseInt(this.element.style.left) < 0) this.element.style.left = `${TAMX - 98}px`;
      if (this.direcao === 2)
        this.element.style.left = `${parseInt(this.element.style.left) + 2}px`;
      if (parseInt(this.element.style.left) + 98 > TAMX) this.element.style.left = '0px';
      space.move();
    }
  }

  class ShipLife {
    constructor() {
      this.element = document.createElement("div");
      this.element.setAttribute('id', 'ship-life');
      this.vidas = 3;
      for (let i = 0; i < 3; i++) {
        let iconLife = document.createElement("img");
        iconLife.src = 'assets/life.png';
        iconLife.className = 'icon-life';
        this.element.appendChild(iconLife);
      }
      space.element.appendChild(this.element);
    }

    removeVida() {
      this.vidas = this.vidas - 1;
      console.log(this.vidas);
      this.element.removeChild(document.getElementsByClassName('icon-life')[0]);
    }
  }

  class Points {
    constructor() {
      this.points = 0;
      this.final = String(this.points);
      this.element = document.createElement("div");
      this.element.setAttribute('id', 'user-points');

      this.element.innerHTML = `000000`;
      space.element.appendChild(this.element);
    }

    atualizar() {
      this.final = String(this.points);
      for (let i = 0; i < (6 - String(this.points).length); i++) {
        this.final = "0" + this.final;
      }

      this.element.innerHTML = `${this.final}`;
      space.element.appendChild(this.element);
    }
  }

  class ShipGun {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "gun-ship";
      this.element.src = "assets/laserRed.png";
      this.element.style.bottom = "60px";
      this.element.style.left = `${parseInt(ship.element.style.left) + 50}px`;
      space.element.appendChild(this.element);


    }
    move() {
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 5}px`;
    }

    destroy() {
      if (parseInt(this.element.style.bottom) > 800) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }

    impactDestroy(verifica) {
      if (verifica) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }
  }

  class EnemyShip {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = "-50px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.velocidade = Math.random() * 2 + 2;
      this.valor = 50;
      space.element.appendChild(this.element);

    }

    move() {
      this.element.style.top = `${(parseInt(this.element.style.top) + this.velocidade) * ACEL}px`;
    }
    destroy() {
      if (parseInt(this.element.style.top) > TAMY) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }
  }

  class EnemyUfo {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-UFO";
      this.element.src = "assets/enemyUFO.png";
      this.element.style.top = "-91px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);

      this.velocidade = Math.random() * 2 + 2;
      this.valor = 20;
    }
    move() {
      this.element.style.top = `${(parseInt(this.element.style.top) + this.velocidade) * ACEL}px`;
    }
    destroy() {
      if (parseInt(this.element.style.top) > TAMY) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }
  }

  class EnemyMeteorBig {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-big";
      this.element.src = "assets/meteorBig.png";
      this.element.style.top = "-111px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = Math.random() * 1 + 2;
      this.valor = 10;
    }
    move() {
      this.element.style.top = `${(parseInt(this.element.style.top) + this.velocidade) * ACEL}px`;
    }
    destroy() {
      if (parseInt(this.element.style.top) > TAMY) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }
  }

  class EnemyMeteorSmall {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-small";
      this.element.src = "assets/meteorSmall.png";
      this.element.style.top = "-42px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      this.velocidade = Math.random() * 3 + 2;
      space.element.appendChild(this.element);
      this.valor = 100;
    }
    move() {
      this.element.style.top = `${(parseInt(this.element.style.top) + this.velocidade) * ACEL}px`;
    }
    destroy() {
      if (parseInt(this.element.style.top) > TAMY) {
        if (!this.destroyed) {
          space.element.removeChild(this.element);
          this.destroyed = true;
        }
      }
    }
  }

  function checkCollision() {
    guns.forEach((e) => enemies.forEach((r) => {
      const rect1 = e.element.getBoundingClientRect();
      const rect2 = r.element.getBoundingClientRect();
      let collision = (rect1.top < rect2.bottom && rect1.bottom > rect2.top && rect1.left < rect2.right && rect1.right > rect2.left);
      if (collision == true && r.element.style.visibility != "hidden") {
        points.points += r.valor;
        r.element.style.visibility = "hidden";
        e.impactDestroy(collision);
      }
    }));
  }
  /*
    function shipDamage() {
      ship.element.src = "assets/playerDamaged.png";
    }
    */

  function checkCollisionShip() {
    enemies.forEach((e) => {
      const rect1 = ship.element.getBoundingClientRect();
      const rect2 = e.element.getBoundingClientRect();
      let collision = (rect1.top < rect2.bottom && rect1.bottom > rect2.top && rect1.left < rect2.right && rect1.right > rect2.left);
      if (collision == true && e.element.style.visibility != "hidden") {
        e.element.style.visibility = "hidden";

        if (life.vidas > 0) {
          life.removeVida();
        } else {
          life.vidas = -1;
        }
        //let timeoutId = setTimeout(shipDamage, 0);
        //setTimeout(function() {
        //  clearTimeout(timeoutId);
        // }, 5000);
        if (life.vidas < 0) {
          gameOver();
        }
      }
    });
  }

  function probabilidade() {
    const random_enemy = Math.random() * 100;
    if (random_enemy <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    if (random_enemy <= PROB_ENEMY_UFO) {
      enemies.push(new EnemyUfo());
    }
    if (random_enemy <= PROB_ENEMY_METEOR_BIG) {
      enemies.push(new EnemyMeteorBig());
    }
    if (random_enemy <= PROB_ENEMY_METEOR_SMALL) {
      enemies.push(new EnemyMeteorSmall());
    }
  }

  function gameOver() {
    console.log("FIM");
    let menuGameOver = document.createElement("div");
    menuGameOver.setAttribute('id', 'fim-de-jogo');

    let textMenu = document.createElement("p");

    let botaoReinicio = document.createElement("div");
    botaoReinicio.setAttribute('id', 'recomecar');

    textMenu.innerHTML = "Que pena! Você perdeu";
    botaoReinicio.innerHTML = "Jogar de novo";

    enemies.forEach((e) => {
      space.element.removeChild(e.element);
    });

    guns.forEach((e) => {
      space.element.removeChild(e.element);
    });

    enemies = [];
    guns = [];

    menuGameOver.appendChild(textMenu);
    menuGameOver.appendChild(botaoReinicio);

    space.element.appendChild(menuGameOver);

    over = 1;

    botaoReinicio.addEventListener('click',() => {
      space.element.removeChild(menuGameOver);
      restart();
    });

  }

  function restart(){
    start = 0;
    over = 0;
    points.element.innerHTML = '';
    clearInterval(rodar);
    init();
  }

  function run() {
    if (!PAUSE && !over) {
      checkCollisionShip();
      checkCollision();

      points.atualizar();

      probabilidade();

      guns.forEach((e) => e.move()); // movimentacao
      guns.forEach((e) => e.destroy());
      enemies.forEach((e) => e.move());
      enemies.forEach((e) => e.destroy());


      guns.forEach((e) => {
        if (e.destroyed) {
          let index = guns.indexOf(e); // Encontra o índice do elemento 3
          if (index > -1) {
            guns.splice(index, 1); // Remove o elemento do array
          }
        }
      }); // limpeza da lista de tiros
      enemies.forEach((e) => {
        if (e.destroyed) {
          let index = enemies.indexOf(e); // Encontra o índice do elemento 3
          if (index > -1) {
            enemies.splice(index, 1); // Remove o elemento do array
          }
        }
      }); // limpeza da lista de inimigos


      TIME += VEL / FPS; // aumenta velocidade
      if (TIME >= 60000) {
        ACEL += 0.005;
        TIME = 0;
      }
      ship.move();
    }
  }

  init();
})();


