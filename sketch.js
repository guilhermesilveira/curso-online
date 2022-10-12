let costas1;
let costas2;
let farra1;
let farra2;
let olhando;
let gameover;
let quieto;

let estaBaguncando = false;
let situacao = "olhando";
let proximaAlteracao = 0;

let giz, grito;

const CADEIRAS_Y = 460;

function preload() {
  costas1 = loadImage("costas1.jpg");
  costas2 = loadImage("costas2.png");
  quieto = loadImage("quieto.png");
  farra1 = loadImage("farra1.png");
  farra2 = loadImage("farra2.png");
  gameover = loadImage("gameover.png");
  olhando = loadImage("olhando.png");
  
  giz = loadSound("giz.mp3");
  giz.setLoop(true);
  grito = loadSound("grito.mp3");
  grito.setLoop(true);
}

function setup() {
  createCanvas(1024, 576);
}

function troca() {
  if (situacao === "olhando") {
    situacao = "nao olhando";
    giz.play();
  } else {
    situacao = "olhando";
    giz.pause();
  }
  proximaAlteracao = millis() + random(2500, 7000);
}

function draw() {
  if (millis() > proximaAlteracao) {
    troca();
  }

  image(costas1, 0, 0);
  if (situacao === "olhando") {
    image(olhando, 0, 0);
  } else {
    let tempo = millis() % 1000;
    if (tempo > 500) {
      image(costas2, 0, 0);
    }
  }

  if (mouseIsPressed || touches.length > 0 || keyIsPressed) {
    
    if(estaBaguncando === false) {
      grito.play();
      estaBaguncando = true;
    }

    if(situacao === "olhando") {
      image(gameover, 0, 0);
    }

    let tempo = millis() % 1200;
    if (tempo > 400) {
      image(farra1, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }
    tempo = millis() % 800;
    if (tempo > 400) {
      image(farra1, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }
    tempo = millis() % 900;
    if (tempo > 450) {
      image(farra1, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }
    
    if(situacao ==="olhando") {
      textSize(64);
      fill("red");
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      giz.stop();
      grito.stop();
      noLoop();
    }
    
  } else {
    grito.pause();
    estaBaguncando = false;
    
    // origem: 180, 100, 450, 720
    // imagem, onde_x_vai_colocar, onde_y_vai_colocar
    // tamanho_x tamanho_y colocado
    // a_partir_de_x, a_partir_de_y da origem
    // tamanho_x tamanho_y da original
    image(quieto, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    image(quieto, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    image(quieto, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
  }
}
