// Variabili principali

let counter = 0; // Contatore che funge da tachimetro
let speedIncrease = 0.5; // Velocità di aumento del contatore
let decreaseFactor = 0.1; // Fattore di riduzione del contatore
let spacePressed = false; // Flag per controllare se spacebar è premuto

// Variabili per le auto
let auto1X = 10;
let auto2X = 200;
let auto2Speed = 1.5; // Velocità della seconda auto

let gameOver = false;

let simulationStarted = false; // Controlla se la simulazione è iniziata

let progress = 0; // Variabile di progresso per il cerchio
let maxProgress = 100; // Valore massimo di progresso

function preload() {
  img1 = loadImage("assets/car1.png");
  img2 = loadImage("assets/car2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (gameOver) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("GAME OVER", width / 2, height / 2 - 100);
    return;
  }

  background(0);
  fill(255);
  rect(0, 0, windowWidth, 80);

  // testo simulazione
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text("TEST", 20, height - 30);

  // Calcola l'angolo della lancetta in base al progresso
  let needleAngle = map(progress, 0, maxProgress, HALF_PI, TWO_PI + HALF_PI);

  // Disegna il cerchio bianco di base
  fill(255);
  noStroke();
  ellipse(width / 2, height / 2, 300, 300);

  // Visualizza le auto
  image(img1, auto1X, 10, img1.width / 8, img1.height / 8);
  image(img2, auto2X, 10, img2.width / 8, img2.height / 8);

  // Gestione della velocità e del progresso circolare
  if (keyIsDown(ENTER)) {
    if (!simulationStarted) {
      simulationStarted = true; // Inizia la simulazione con la prima pressione di ENTER
    }

    counter += speedIncrease;
    counter = constrain(counter, 0, maxProgress);
    progress = counter;
    auto1X += map(counter, 0, 100, 0, 5);
  } else {
    counter -= decreaseFactor;
    counter = max(counter, 0);
    progress = counter;
    if (!spacePressed) {
      progress -= 0.5;
    }
    auto1X += map(counter, 0, 100, 0, 3);
  }

  // Attiva il semicerchio verde con la barra spaziatrice
  if (keyIsDown(32) && counter > 0) {
    spacePressed = true;
    counter -= decreaseFactor * 3;
    counter = max(counter, 0);
    progress -= 2;
    auto1X += map(counter, 0, 100, 0, 1);
  } else {
    spacePressed = false;
  }

  // Disegna la lancetta
  stroke(100);
  strokeWeight(8);
  line(
    width / 2,
    height / 2,
    width / 2 + cos(needleAngle) * 150,
    height / 2 + sin(needleAngle) * 150
  );

  // // Disegna il semicerchio verde se attivo
  // if (greenArcVisible) {
  //   stroke(130, 255, 134, 150);
  //   strokeWeight(10);
  //   noFill();
  //   arc(width / 2, height / 2, 320, 320, greenArcAngleStart, greenArcAngleEnd);
  // }

  // Movimento della seconda auto
  if (simulationStarted) {
    auto2X += auto2Speed;
    if (auto2X > width - img2.width / 8) {
      auto2X = width - img2.width / 8;
      auto2Speed = 0;
    }
  }

  // Controllo collisione per il game over
  if (auto1X + img1.width / 8 > auto2X) {
    gameOver = true;
  }

  // Cerchio bianco sotto il numero
  fill(255);
  noStroke();
  ellipse(width / 2, height / 2, 100, 100);

  // Testo del contatore al centro
  fill(0);
  textSize(80);
  textAlign(CENTER, CENTER);
  textFont("aktiv-grotesk");
  textStyle(BOLD);
  text(int(counter), width / 2, height / 2);
}
