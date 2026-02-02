// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.
// ------------------ Buttons ------------------
const waitBtn = {
  x: 450, // horizontal center
  y: 350, // vertically inside the canvas
  w: 260,
  h: 90,
  label: "Wait for the Night to Pass...",
};

const trees = [];
for (let i = 0; i < 6; i++) {
  let treeX = i * 150 + 50;
  let treeY = 400; // fixed Y
  trees.push({ x: treeX, y: treeY });
}

const exploreBtn = {
  x: 450,
  y: 450, // below waitBtn
  w: 260,
  h: 90,
  label: "Explore in the Dark",
};

// ------------------ Main draw function ------------------
function drawGame() {
  background("#272A4F");

  // Title text
  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Currently Night Time...", width / 2, 160);

  textSize(18);
  text("Click a Button to Decide your Next Move", width / 2, 210);

  // Draw both buttons
  drawGameButton(waitBtn);
  drawGameButton(exploreBtn);

  // Cursor feedback
  const over = isHover(waitBtn) || isHover(exploreBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------ Button drawing helper ------------------
function drawGameButton({ x, y, w, h, label, textSize: btnTextSize }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });
  noStroke();

  // Button color
  fill(hover ? color(180, 220, 255, 220) : color(200, 220, 255, 190));

  rect(x, y, w, h, 14);

  // Button label text
  fill(0);
  textSize(btnTextSize || 18); // use custom size if given
  textAlign(CENTER, CENTER);
  text(label, x, y, w - 20, h - 20); // wrap text if needed
}

// ------------------ Mouse input ------------------
function gameMousePressed() {
  if (isHover(waitBtn)) {
    // Switch to the sunny forest page
    currentScreen = "day";
  } else if (isHover(exploreBtn)) {
    // Switch to the dragon page
    currentScreen = "instr";
  }
}

// ------------------ Keyboard input ------------------
function gameKeyPressed() {
  if (keyCode === ENTER) triggerRandomOutcome("wait"); // default
}

function drawDay() {
  // ---- Sky background ----
  background(135, 206, 235); // light blue sky

  // ---- Sun ----
  fill(255, 223, 0); // yellow
  noStroke();
  ellipse(750, 100, 100, 100); // sun in top-right corner

  // ---- Forest (trees) ----
  fill(34, 139, 34); // dark green leaves
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    // Tree trunk
    fill(139, 69, 19);
    rect(tree.x, tree.y + 50, 20, 170);
    // Tree foliage
    fill(34, 139, 34);
    ellipse(tree.x, tree.y, 80, 80);
  }

  // ---- Ground ----
  fill(34, 139, 34);
  rect(width / 2, 580, width, 100);

  // ---- Title and text ----
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("After a Good Night's Sleep, the Sun Has Risen", width / 2, 100);

  textSize(18);
  text("It Is Now Daytime!", width / 2, 160);

  // ---- Continue button ----
  const riverBtn = {
    x: 700,
    y: 300,
    w: 300,
    h: 70,
    label: "Search the River",
  };

  const caveBtn = {
    x: 200,
    y: 300,
    w: 300,
    h: 70,
    label: "Search the Cave",
  };

  drawInstrButton(riverBtn); // reuse your button style
  cursor(isHover(riverBtn) ? HAND : ARROW);

  drawInstrButton(caveBtn); // reuse your button style
  cursor(isHover(caveBtn) ? HAND : ARROW);
}

function dayMousePressed() {
  const riverBtn = { x: 700, y: 300, w: 300, h: 70 };
  const caveBtn = { x: 200, y: 300, w: 300, h: 70 };

  if (isHover(riverBtn)) {
    currentScreen = "river"; // show the river page
  } else if (isHover(caveBtn)) {
    currentScreen = "instr"; // the Oh No page with the dragon
  }
}

function drawRiver() {
  // ---- Background (under the river) ----
  background(0, 105, 148); // deep water blue

  // ---- River floor ----
  fill(50, 50, 50); // dark gray rocks/sand
  rect(width / 2, height - 50, width, 100);

  // ---- Some bubbles / water effect (optional) ----
  fill(255, 255, 255, 100);
  for (let i = 0; i < 20; i++) {
    ellipse(random(width), random(height - 200, height - 50), 10, 10);
  }

  // ---- Title and text ----
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("You Jumped into the River!", width / 2, 100);

  textSize(18);
  text("Wait is that...THE KEY!!!", width / 2, 160);

  // ---- Key in the river (bigger, higher, both teeth on top) ----
  fill(255, 223, 0); // bright yellow for the key
  noStroke();

  // key shaft (main body) – bigger and higher
  rect(width / 2, height - 250, 80, 20, 5); // horizontal rectangle, main body

  // key teeth (both on top of the shaft)
  rect(width / 2 - 10, height - 260, 12, 25); // left tooth, closer to handle
  rect(width / 2 + 20, height - 260, 12, 25); // right tooth, further along shaft

  // key handle – bigger and higher
  ellipse(width / 2 - 50, height - 250, 40, 40); // round handle

  // ---- Continue button ----
  const continueBtn = {
    x: width / 2,
    y: 500,
    w: 220,
    h: 70,
    label: "Play Again!",
  };

  drawInstrButton(continueBtn); // reuse button style
  cursor(isHover(continueBtn) ? HAND : ARROW);
}

function riverMousePressed() {
  const continueBtn = { x: width / 2, y: 500, w: 220, h: 70 };

  if (isHover(continueBtn)) {
    currentScreen = "start"; // <-- goes back to the start screen
  }
}
