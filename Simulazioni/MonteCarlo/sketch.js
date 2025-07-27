let r = 400;
let punti_totali = 0;
let punti_cerchio = 0;
let pie = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");

  background(0);
  noFill();
  strokeWeight(4);

  translate(width / 2, 400);
  ellipse(0, 0, r * 2, r * 2);
  rect(-r, -r, r * 2, r * 2);
}

function draw() {
  frameRate(30);

  push();
  translate(width / 2, 400);

  for (let i = 0; i < 10000; i++) {
    punti_totali++;
    let x = random(-r, r);
    let y = random(-r, r);
    let d = dist(0, 0, x, y);
    if (d <= r) {
      stroke('#34dbeb');
      punti_cerchio++;
    } else {
      stroke('#810d9e');
    }
    strokeWeight(1);
    point(x, y);
  }

  pie = 4 * (punti_cerchio / punti_totali);

  pop();
  const output = document.getElementById("pi-output");
  output.textContent = `π ≈ ${pie.toFixed(6)}`;
}
