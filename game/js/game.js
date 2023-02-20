(function() {
  const TAMX = 600;
  const TAMY = 800;
  var FPS = 100;
  let VEL = 1000;
  let PAUSE = 0;
  let TIME = 0;
  let ACEL = 1;
  let duracao = 5000;
  
  const PROB_ENEMY_SHIP = 0.6;
  const PROB_ENEMY_UFO = 0.2;
  const PROB_ENEMY_BIG = 0.4;
  const PROB_ENEMY_SMALL = 0.13;

  let space, ship, life, gun, points;
  let enemies = [];
  let guns = [];
  let start = 0;

  function init() {
    space = new Space();
    ship = new Ship();
    life = new ShipLife();
    points = new Points();

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && start === 0) {
        window.setInterval(run, parseInt(VEL / FPS));
        start = start + 1;
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === 'p' || e.key === 'P') PAUSE = !PAUSE;
    });
  }

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
      if (parseInt(this.element.style.left) < 0) this.element.style.left = `${TAMX}px`;
      if (this.direcao === 2)
        this.element.style.left = `${parseInt(this.element.style.left) + 2}px`;
      if (parseInt(this.element.style.left) > TAMX) this.element.style.left = '0px';
      space.move();
    }
  }

  class ShipLife {
    constructor() {
      this.element = document.createElement("div");
      this.element.setAttribute('id', 'ship-life');
      for (let i = 0; i < 3; i++) {
        let iconLife = document.createElement("img");
        iconLife.src = 'assets/life.png';
        iconLife.className = 'icon-life';
        this.element.appendChild(iconLife);
      }
      space.element.appendChild(this.element);
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

  class EnemyUFO {
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
        
        //let timeoutId = setTimeout(shipDamage, 0);
        //setTimeout(function() {
        //  clearTimeout(timeoutId);
        // }, 5000);
      }
    });
  }

  function probabilidade() {
    const random_enemy = Math.random() * 100;
    if (random_enemy <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }
    if (random_enemy <= PROB_ENEMY_UFO) {
      enemies.push(new EnemyUFO());
    }
    if (random_enemy <= PROB_ENEMY_BIG) {
      enemies.push(new EnemyMeteorBig());
    }
    if (random_enemy <= PROB_ENEMY_SMALL) {
      enemies.push(new EnemyMeteorSmall());
    }
  }

  function run() {
    if (!PAUSE) {
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


