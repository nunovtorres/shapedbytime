// ================== TEMAS ==================
let themes = [
  { bg: "#506831", txt: "#f2480c" }, // Página 1
  { bg: "#7c4c13", txt: "#001eff" }, // Página 2
  { bg: "#000000", txt: "#ffffff" }  // Página 3
];

let pageIndex = -1;

// ================== FONT ==================
let dmSans;

function preload() {
  dmSans = loadFont("assets/fonts/DMSans-Regular.ttf");
}

// ================== PÁGINA 1 ==================
let letters = [];
let message = "TOOLS EXPAND PERSPECTIVE";
let pagina1Iniciada = false;

// ================== PÁGINA 2 ==================
let pointerText = "TIME REFINES VISION";
let timeLetters = [];
let angle = 0;
let pivotIndex;

// ================== SETUP ==================
function setup() {
  createCanvas(windowWidth, windowHeight);

  // fallback de segurança
  if (dmSans) {
    textFont(dmSans);
  }

  textAlign(LEFT, BASELINE);
  pivotIndex = pointerText.indexOf("T");
  initTimeLetters();
}

// ================== DRAW ==================
function draw() {

  if (pageIndex === -1) {
    renderHome();
    return;
  }

  background(themes[pageIndex].bg);
  fill(themes[pageIndex].txt);

  if (pageIndex === 0 && !pagina1Iniciada) {
    initPagina1();
    pagina1Iniciada = true;
  }

  if (pageIndex === 0) renderPagina1();
  if (pageIndex === 1) renderPagina2();
  if (pageIndex === 2) renderPagina3();
}

// ================== HOME ==================
function renderHome() {
  background("#b30000");
  fill("#c9a666");
  textFont(dmSans);
  textSize(36);

  let sentence = [
    { word: "PERSPECTIVE", link: 0 },
    { word: "IS", link: null },
    { word: "SHAPED", link: null },
    { word: "BY", link: null },
    { word: "TIME", link: 1 },
    { word: "AND", link: null },
    { word: "WHAT", link: null },
    { word: "SURROUNDS", link: 2 },
    { word: "US", link: null }
  ];

  let totalWidth = 0;
  for (let item of sentence) totalWidth += textWidth(item.word + " ");

  let x = (width - totalWidth) / 2;
  let y = height / 2;

  for (let item of sentence) {
    let w = textWidth(item.word + " ");
    if (item.link !== null) {
      drawInlineLink(item.word, x, y, item.link);
    } else {
      text(item.word, x, y);
    }
    x += w;
  }
}

function drawInlineLink(word, x, y, targetPage) {
  let w = textWidth(word);
  let h = textAscent();

  let hover =
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y - h &&
    mouseY < y + 6;

  if (hover) drawLiquidWord(word, x, y, 1);
  else text(word, x, y);

  if (hover && mouseIsPressed) setPage(targetPage);
}

// ================== PÁGINA 1 ==================
function initPagina1() {
  letters = [];
  textFont(dmSans);
  textSize(28);

  let tracking = 10;
  let y = height / 2;

  let totalWidth = 0;
  for (let c of message) totalWidth += textWidth(c) + tracking;
  totalWidth -= tracking;

  let x = (width - totalWidth) / 2;

  for (let c of message) {
    letters.push({
      char: c,
      ox: x,
      oy: y,
      rx: random(width),
      ry: random(height),
      x: random(width),
      y: random(height),
      z: pow(random(), 1.8)
    });
    x += textWidth(c) + tracking;
  }
}

function renderPagina1() {
  textFont(dmSans);
  fill(themes[0].txt);

  let focus = map(dist(mouseX, mouseY, width/2, height/2), 0, width/3, 1, 0);
  focus = constrain(focus, 0, 1);

  for (let l of letters) {
    let size = lerp(5, 150, l.z);
    textSize(size);

    l.x = lerp(l.x, lerp(l.rx, l.ox, focus), 0.08);
    l.y = lerp(l.y, lerp(l.ry, l.oy, focus), 0.08);

    text(l.char, l.x, l.y);
  }
}

// ================== PÁGINA 2 ==================
function initTimeLetters() {
  textFont(dmSans);
  textSize(16);

  timeLetters = [];
  let spacing = textSize() * 1.5;

  for (let i = 0; i < pointerText.length; i++) {
    timeLetters.push({
      char: pointerText[i],
      offset: (i - pivotIndex) * spacing,
      fx: random(width),
      fy: random(height),
      noise: random(1000)
    });
  }
}

function renderPagina2() {
  textFont(dmSans);
  textAlign(CENTER, CENTER);

  let cx = width / 2;
  let cy = height / 2;

  let focus = map(dist(mouseX, mouseY, cx, cy), 0, width * 0.9, 1, 0);
  focus = constrain(focus, 0, 1);

  angle += 0.003;

  push();
  translate(cx, cy);
  rotate(angle);

  for (let l of timeLetters) {
    let x = lerp(l.fx - cx, l.offset, focus);
    let y = lerp(l.fy - cy, 0, focus);
    text(l.char, x, y);
  }

  pop();
}

// ================== PÁGINA 3 ==================
function renderPagina3() {
  background("#6c6b0d");
  fill(214);
  textFont(dmSans);
  textSize(48);
  textAlign(LEFT, TOP);

  text("DESIGN IS AN OBSESSION", 40, 120);
}

// ================== NAVEGAÇÃO ==================
function setPage(i) {
  pageIndex = i;
  if (pageIndex === 0) pagina1Iniciada = false;
}

// ================== RESIZE ==================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initTimeLetters();
}
