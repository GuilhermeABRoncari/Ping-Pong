//variáveis da bolinha
let xBall = 300;
let yBall = 200;
let diameter = 15;
let radius = diameter / 2;

//variasveis da raquete
let xRacket = 1;
let yRacket = 150;
let racketLength = 10;
let racketHeight = 90;

//variaveis do adversario
let xAdversary = 585;
let yAdversary = 150;
let speedYAdversary;

//velocidade da bolinha
let speedXBall = 6;
let speedYBall = 6;

let isColliding = false;

//placar do jogo
let playerPoints = 0;
let adversaryPoints = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  showBall();
  moveBall();
  collisionBallValidator();
  showRacket(xRacket, yRacket, xAdversary, yAdversary);
  movePlayerRacket();
  //collisionRacketValidator();
  collisionRacket2dLib(xRacket, yRacket);
  collisionRacket2dLib(xAdversary, yAdversary);
  //moveAdversary();
  displayPoints();
  score();
}

function showBall() {
  circle(xBall, yBall, diameter);
}

function moveBall() {
  xBall += speedXBall;
  yBall += speedYBall;
}

function collisionBallValidator() {
  if (xBall + radius > width || xBall - radius < 0) {
    speedXBall *= -1;
  }
  if (yBall + radius > height || yBall - radius < 0) {
    speedYBall *= -1;
  }
}
function showRacket(xR, yR, xA, yA) {
  rect(xR, yR, racketLength, racketHeight);
  rect(xA, yA, racketLength, racketHeight);
}
function movePlayerRacket() {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}
function collisionRacketValidator() {
  if (
    xBall - radius < xRacket + racketLength &&
    yBall - radius < yRacket + racketHeight &&
    yBall + radius > yRacket
  ) {
    speedXBall *= -1;
  }
}
function collisionRacket2dLib(x, y) {
  isColliding = collideRectCircle(
    x,
    y,
    racketLength,
    racketHeight,
    xBall,
    yBall,
    radius
  );
  if (isColliding) {
    speedXBall *= -1;
  }
}
function moveAdversary() {
  speedYAdversary = yBall - yAdversary - racketLength / 2 - 30;
  yAdversary += speedYAdversary;
}
function displayPoints() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  dynamicScoreColors(playerPoints, adversaryPoints);
  rect(150, 10, 40, 20);
  dynamicScoreColors(adversaryPoints, playerPoints);
  rect(450, 10, 40, 20);
  fill(255);
  text(playerPoints, 170, 26);
  text(adversaryPoints, 470, 26);
}
function score() {
  if (xBall > 590) {
    playerPoints += 1;
  }
  if (xBall < 10) {
    adversaryPoints += 1;
  }
}
function dynamicScoreColors(x, y) {
  if (x == y) {
    fill(color(0, 128, 255));
  }
  if (x > y) {
    fill(color(0, 255, 128));
  }
  if (x < y) {
    fill(color(255, 128, 0));
  }
}
