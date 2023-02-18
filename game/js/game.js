(function() {
  const TAMX = 600;
  const TAMY = 800;
  var FPS = 100;
  let VEL = 1000;
  let PAUSE = 0;
  let TIME = 0;
  let ACEL = 1;

  const PROB_ENEMY_SHIP = 0.6;
  const PROB_ENEMY_UFO = 0.2;
  const PROB_ENEMY_BIG = 0.4;
  const PROB_ENEMY_SMALL = 0.13;

  let space, ship, life, gun;
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
      if(gun.length < 5) {
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

      this.largura =  98;
      this.altura = 75;
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
      for(let i = 0; i < 3; i++){
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
      for(let i = 0; i < (6 - String(this.points).length); i++){
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

      this.altura = 33;
      this.largura = 9;
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
      space.element.appendChild(this.element);

      this.largura = 98;
      this.altura = 50;
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

      this.largura = 91;
      this.altura = 91;
      this.velocidade = Math.random() * 2 + 2
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

      this.largura = 136;
      this.altura = 111;
      this.velocidade = Math.random() * 1 + 2;
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

      this.largura = 44;
      this.altura = 42;
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

  // função para verificar colisão entre dois objetos
  function checkCollision(obj1, obj2) {
    // coordenadas do retângulo delimitador do primeiro objeto
    let obj1Left = parseInt(obj1.element.style.left);
    let obj1Right = obj1Left + obj1.largura;
    let obj1Bottom = parseInt(obj1.element.style.bottom);
    let obj1Top = obj1Bottom + obj1.altura;
  
    // coordenadas do retângulo delimitador do segundo objeto
    let obj2Left = parseInt(obj2.element.style.left);
    let obj2Right = obj2Left + obj2.largura;
    let obj2Top = parseInt(obj2.element.style.top);
    let obj2Bottom = obj2Top + obj2.altura;

    //let destruido1 = obj1.destroyed;
    //let destruido2 = obj2.destroyed;
    // console.log(`L1: ${obj1Left}, R1: ${obj1Right}, T1: ${obj1Top}, B1: ${obj1Bottom}`);

    // console.log(`L2: ${obj2Left}, R2: ${obj2Right}, T2: ${obj2Top}, B2: ${obj2Bottom}`);
    // verifica se há sobreposição entre os retângulos delimitadores
    if (obj1Left <= obj2Right &&
        obj1Right >= obj2Left &&
        obj1Top <= obj2Bottom &&
        obj1Bottom >= obj2Top) {
      return true; // há colisão
    } else {
      return false; // não há colisão
    }
  }
  


  function run() {
    if (!PAUSE) {
      
      guns.forEach((e)=>{
        enemies.forEach((x)=>{
          if(checkCollision(e,x)){
            x.element.style.visibility = "hidden";
            e.impactDestroy(checkCollision(e,x));
          }
        });
      });
  
      
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

      guns.forEach((e) => e.move());
      guns.forEach((e) => e.destroy());
      enemies.forEach((e) => e.move());
      enemies.forEach((e) => e.destroy());

      

      guns.forEach((e)=>{
        if(e.destroyed){
          let index = guns.indexOf(e); // Encontra o índice do elemento 3
          if (index > -1) {
            guns.splice(index, 1); // Remove o elemento do array
          }
        }
      }); // limpeza da lista de tiros
      enemies.forEach((e)=>{
        if(e.destroyed){
          let index = enemies.indexOf(e); // Encontra o índice do elemento 3
          if (index > -1) {
            enemies.splice(index, 1); // Remove o elemento do array
          }
        }
      }); // limpeza da lista de inimigos


      
      TIME += VEL / FPS;
      if(TIME >= 60000){
        ACEL += 0.007;
        TIME = 0;
      }
      ship.move();
    }
  }

  init();
})();
