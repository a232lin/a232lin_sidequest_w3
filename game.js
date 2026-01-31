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
  if (isHover(waitBtn)) triggerRandomOutcome("wait");
  else if (isHover(exploreBtn)) triggerRandomOutcome("explore");
}

// ------------------ Keyboard input ------------------
function gameKeyPressed() {
  if (keyCode === ENTER) triggerRandomOutcome("wait"); // default
}

// ------------------ Game logic ------------------
function triggerRandomOutcome(action) {
  if (action === "wait") {
    if (random() < 0.5) currentScreen = "win";
    else currentScreen = "lose";
  } else if (action === "explore") {
    if (random() < 0.6)
      currentScreen = "win"; // maybe different chance
    else currentScreen = "lose";
  }
}
