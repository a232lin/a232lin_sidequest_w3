// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawStart() → what the start/menu screen looks like
// 2) input handlers → what happens on click / key press on this screen
// 3) a helper function to draw menu buttons

// ------------------------------------------------------------
// Start screen visuals
// ------------------------------------------------------------
// drawStart() is called from main.js only when:
// currentScreen === "start"

// ------------------ Cloud Helper ------------------
function drawCloud(x, y, scale, alpha) {
  noStroke();
  fill(255, 255, 255, alpha); // transparency

  ellipse(x, y, 140 * scale, 90 * scale);
  ellipse(x + 70 * scale, y - 25 * scale, 160 * scale, 110 * scale);
  ellipse(x + 140 * scale, y, 140 * scale, 90 * scale);
  ellipse(x + 70 * scale, y + 25 * scale, 180 * scale, 110 * scale);
}

// ------------------ Start Screen ------------------
function drawStart() {
  // Gradient background: magical sky
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color("#B8AFFF"), color("#8B8BA6"), inter);
    stroke(c);
    line(0, i, width, i);
  }

  // ---- Clouds (behind the text) ----
  drawCloud(100, 50, 1.0, 150);
  drawCloud(350, 80, 0.8, 120);
  drawCloud(600, 60, 1.3, 180);
  drawCloud(250, 120, 0.7, 100);
  drawCloud(450, 300, 0.7, 100);

  drawCloud(150, 300, 1.0, 130);
  drawCloud(200, 540, 1.0, 130);
  drawCloud(30, 480, 1.0, 130);
  drawCloud(400, 670, 1.2, 150);
  drawCloud(650, 510, 0.9, 120);
  drawCloud(300, 370, 0.8, 100);
  drawCloud(500, 500, 1.1, 140);

  drawCloud(50, height - 60, 0.9, 140);
  drawCloud(200, height - 40, 1.1, 160);
  drawCloud(400, height - 80, 0.8, 130);
  drawCloud(550, height - 50, 1.2, 180);
  drawCloud(700, height - 70, 0.7, 120);

  // ---- Title text ----
  fill("#efcae4"); // soft pastel pink
  textSize(50);
  textAlign(CENTER, CENTER);
  stroke("black");
  strokeWeight(2);
  textFont("Georgia"); // elegant serif for magical feel
  text("Find the Missing Key!", width / 2, 180);

  // ---- Buttons ----
  const startBtn = {
    x: width / 2,
    y: 320,
    w: 240,
    h: 80,
    label: "Begin the  Journey",
  };
  const instrBtn = {
    x: width / 2,
    y: 430,
    w: 240,
    h: 80,
    label: "How to Play",
  };
  drawButton(startBtn);
  drawButton(instrBtn);

  // ---- Cursor feedback ----
  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------ Button Helper ------------------
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });
  noStroke();

  // Soft magical colors
  if (hover) {
    fill(255, 180, 220, 200); // soft pink glow on hover
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 220, 150);
  } else {
    fill(255, 220, 240, 180); // light pastel base
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(200, 200, 250, 100);
  }

  rect(x, y, w, h, 14);
  drawingContext.shadowBlur = 0;

  // Button label text
  fill(40, 60, 70);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------ Mouse Input ------------------
function startMousePressed() {
  const startBtn = { x: width / 2, y: 320, w: 240, h: 80 };
  const instrBtn = { x: width / 2, y: 430, w: 240, h: 80 };

  if (isHover(startBtn)) currentScreen = "game";
  else if (isHover(instrBtn)) currentScreen = "instr";
}

// ------------------ Keyboard Input ------------------
function startKeyPressed() {
  if (keyCode === ENTER) currentScreen = "game";
  if (key === "i" || key === "I") currentScreen = "instr";
}
