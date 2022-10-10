const BORDER_WIDTH = 20,
      GOALSIDE_HEIGHT = 500 / 3;
let p1, p2, puck, p1Score = 0,
  p2Score = 0,
  startStroke = 300,
  winScore = 3;
let gameScene = 0;

//
function setup() {
  createCanvas(900, 500);
  noStroke();
  p1 = new Pusher(width / 8, height / 2, 60, 5);
  p2 = new Pusher(width * (7 / 8), height / 2, 60, 5);
  puck = new Puck(width / 2, height / 2, 25, 5);
}
//
function draw() {
  background(255, 80);
  drawTable();
  game();
}

function game() {
  //switches to parts of the game
  if (gameScene == 0) startAnimation();
  else if (gameScene == 1) {
    scoring();
    gameFunction();
  } else if (gameScene == 2) winScreen();
}

function gameFunction() {
  p1.limit(BORDER_WIDTH, width / 2, BORDER_WIDTH, height - BORDER_WIDTH);
  p1.render("#1338EE", "#1520AA", 1 / 2);
  //Below are the keycodes for W, S, A, and D, for moving up, down, left and right, respectively
  p1.update(87, 83, 65, 68);
  p2.limit(width / 2, width - BORDER_WIDTH, BORDER_WIDTH, height - BORDER_WIDTH);
  //Below are the keycodes for UArr, DArr, LArr, and RArr, respectively
  p2.update(38, 40, 37, 39);
  p2.render("#1338EE", "#1520AA", 1 / 2);
  puckBounds();
  puck.render("#800000", "#D92121", 2 / 3);
  puck.update();
  puck.bounce();
  puck.collision(p1);
  puck.collision(p2);
}

function scoring() {
  if ((puck.pos.y + puck.rad) < (height / 3) + 3 || (puck.pos.y - puck.rad)) {
    if (puck.pos.x <= puck.rad) {
      p1.reset();
      p2.reset();
      puck.reset();
      p2Score++;
    } else if (puck.pos.x >= width - puck.rad) {
      p1.reset();
      p2.reset();
      puck.reset();
      p1Score++;
    }
    renderScore();
  }
  isGameOver();
}

function isGameOver() {
  //if a players score exceeds a certain winning score, set the win screen
  if (p2Score >= winScore || p1Score >= winScore) gameScene = 2;
}

function renderScore() {
  fill(100);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(p1Score, width / 4, height / 4);
  text(p2Score, width * (3 / 4), height / 4);
}

function startAnimation() {
  textAlign(CENTER, CENTER);
  //ready shrinks in size
  fill(0, 200);
  if (startStroke > 20) {
    background(220, 70);
    textSize(startStroke);
    text("Ready", width / 2, height / 2);
    startStroke -= 5;
  }
  //when ready is small, start comes out for a small amt of time, then we switch to the game.
  else if (startStroke <= 20) {
    textSize(50);
    text("Start", width / 2, height / 2);
    startStroke--;
    if (startStroke <= -20) gameScene = 1;
  }
}

function drawTable() {
  rectMode(CORNER);

  //borders/boundaries
  fill(0);
  rect(0, 0, width, BORDER_WIDTH);
  rect(0, height - BORDER_WIDTH, width, BORDER_WIDTH);
  rect(0, 0, BORDER_WIDTH, GOALSIDE_HEIGHT);
  rect(0, height - GOALSIDE_HEIGHT, BORDER_WIDTH, GOALSIDE_HEIGHT);
  rect(width - BORDER_WIDTH, 0, BORDER_WIDTH, GOALSIDE_HEIGHT);
  rect(width - BORDER_WIDTH, height - GOALSIDE_HEIGHT, BORDER_WIDTH, GOALSIDE_HEIGHT);

  //goal and its highlights
  noStroke();
  for (let i = 0; i <= 30; i++) {
    fill(255, 0, 0, 240 - (8 * i));
    rect(i - 10, (height / 3), 1, (height / 3));
  }
  for (let i = 0; i <= 30; i++) {
    fill(255, 0, 0, 240 - (8 * i));
    rect(width - i + 10, (height / 3), 1, (height / 3));
  }

  //lines and markings around the table
  stroke(5);
  noFill();
  line(width / 2, 0, width / 2, height);
  ellipse(width / 2, height / 2, 150, 150);
  ellipse(0, height / 2, 350, 350);
  ellipse(width, height / 2, 350, 350);

  //air holes 
  // for(let i = BORDER_WIDTH; i <= width - BORDER_WIDTH; i += 10){
  //   for(let j = 0; j < height; j += 10) {
  //     point(i, j);
  //   }
  // }
}

function puckBounds() {
  //changes border constrain values based on where the puck object is
  if ((puck.pos.y + puck.rad) < (height / 3) + 3 || (puck.pos.y - puck.rad) > height * (2 / 3) - 3) {
    puck.limit(BORDER_WIDTH, width - BORDER_WIDTH, BORDER_WIDTH, height - BORDER_WIDTH);
  } else {
    puck.limit(0, width, BORDER_WIDTH, height - BORDER_WIDTH);
  }
}

function winScreen() {
  background(0);
  fill(255);
  if (p1Score >= winScore) text("Player 1 Wins! \nRefresh to play again.", width / 2, height / 2);
  if (p2Score >= winScore) text("Player 2 Wins! \nRefresh to play again.", width / 2, height / 2);
}