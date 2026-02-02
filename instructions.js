// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawInstr() → what the instructions screen looks like
// 2) input handlers → how the player returns to the start screen
// 3) helper functions specific to this screen

// ------------------------------
// Main draw function for instructions screen
// ------------------------------
// drawInstr() is called from main.js
// only when currentScreen === "instr"
function drawInstr() {
  // Light neutral background
  background("#4D4341");

  // ---- Simple smoky effect ----
  noStroke();
  for (let i = 0; i < 40; i++) {
    // more puffs
    fill(200, 200, 200, random(20, 70)); // softer transparency
    let sx = width / 2 + random(-300, 300); // wider horizontal spread
    let sy = 250 + random(-100, 150); // taller vertical spread
    let sw = random(50, 120); // bigger width
    let sh = random(30, 80); // bigger height
    ellipse(sx, sy, sw, sh); // draw smoke puff
  }

  noStroke();

  // ---- Dragon body ----
  fill(200, 0, 0);
  ellipse(width / 2, 330, 160, 80); // body
  ellipse(width / 2 + 90, 320, 60, 25); // tail

  // ---- Legs ----
  fill(180, 0, 0);
  ellipse(width / 2 - 40, 370, 25, 35); // left leg
  ellipse(width / 2 + 40, 370, 25, 35); // right leg

  // ---- Head ----
  fill(200, 0, 0);
  ellipse(width / 2 - 90, 300, 70, 60); // head

  // ---- Eyes ----
  fill(255, 255, 0);
  ellipse(width / 2 - 105, 290, 14, 14); // left eye
  ellipse(width / 2 - 75, 290, 10, 10); // right eye (angry squint)

  // ---- Mouth (open wide) ----
  fill(150, 0, 0);
  arc(width / 2 - 90, 310, 50, 40, PI / 4, (3 * PI) / 4); // big open mouth

  // ---- Fire (big, flickery) ----
  fill(255, random(180, 255), 0, 200);
  triangle(
    width / 2 - 120,
    310,
    width / 2 - 200,
    280 + random(-5, 5),
    width / 2 - 200,
    340 + random(-5, 5),
  );

  // ---- Spikes along back (more threatening) ----
  fill(220, 0, 0);
  triangle(width / 2 - 40, 290, width / 2 - 30, 270, width / 2 - 20, 290);
  triangle(width / 2, 290, width / 2 + 10, 270, width / 2 + 20, 290);
  triangle(width / 2 + 40, 290, width / 2 + 50, 270, width / 2 + 60, 290);
  triangle(width / 2 + 70, 300, width / 2 + 80, 280, width / 2 + 90, 300);

  // ---- Wings (pointed, looming) ----
  fill(180, 0, 0, 180);
  triangle(width / 2 - 30, 300, width / 2 - 100, 220, width / 2 - 10, 270); // left wing
  triangle(width / 2 + 30, 300, width / 2 + 100, 220, width / 2 + 10, 270); // right wing

  // ---- Screen title ----
  fill(0);
  textAlign(CENTER, TOP);
  textSize(36);
  text("Oh no...", width / 2, 80);

  // ---- Instruction text ----
  textSize(18);

  // \n creates a line break in the text
  // This is useful for simple multi-line instructions
  const lines = "The Dragon Has Found YOU!\n" + "You're DEAD...!";

  text(lines, width / 2, 160);

  // ---- Back button ----
  // This button lets the player return to the start screen
  const backBtn = {
    x: width / 2, // centred horizontally
    y: 500,
    w: 220,
    h: 70,
    label: "TRY AGAIN",
  };

  // Draw the back button
  drawInstrButton(backBtn);

  // Change cursor when hovering over the button
  cursor(isHover(backBtn) ? HAND : ARROW);
}

// ------------------------------
// Mouse input for instructions screen
// ------------------------------
// Called from main.js only when currentScreen === "instr"
function instrMousePressed() {
  // Must match drawInstr()
  const backBtn = { x: width / 2, y: 500, w: 220, h: 70 };

  if (isHover(backBtn)) {
    currentScreen = "start";
  }
}

// ------------------------------
// Keyboard input for instructions screen
// ------------------------------
// Provides keyboard-only navigation
function instrKeyPressed() {
  // ESC is a common “go back” key in games and apps
  if (keyCode === ESCAPE) {
    currentScreen = "start";
  }

  // B key is an additional, explicit shortcut for “back”
  if (key === "b" || key === "B") {
    currentScreen = "start";
  }
}

// ------------------------------
// Button drawing helper (instructions screen)
// ------------------------------
// This function is only responsible for drawing the button.
// It is kept separate so the visual style can be changed
// without touching input or game logic.
function drawInstrButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check whether the mouse is hovering over the button
  const hover = isHover({ x, y, w, h });

  noStroke();

  // Subtle colour change on hover for visual feedback
  fill(hover ? color(200, 200, 255, 200) : color(220, 220, 255, 170));

  // Draw the button shape
  rect(x, y, w, h, 12);

  // Draw the button text
  fill(0);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
