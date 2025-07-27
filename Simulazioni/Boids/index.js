let stormo = [];
let sliderAllinea, sliderCoesione, sliderRepulsione, sliderConnessioni;

function setup() {
  createCanvas(larghezza, altezza);

  creaSliderEtichettato("Allineamento", 0, 1, 0.5, 0.01);
  creaSliderEtichettato("Coesione", 0, 5, 1, 0.1);
  creaSliderEtichettato("Repulsione", 0, 5, 2.5, 0.1);
  creaSliderEtichettato("Connessioni", 0, 1, 0, 1);

  for (let i = 0; i < 100; i++) {
    stormo.push(new Boid());
  }
}

function draw() {
  background('#6db3e8');
  for (let uccello of stormo) {
    uccello.inFrame();
    uccello.update(stormo);
    uccello.show();
  }
}

function creaSliderEtichettato(etichetta, min, max, val, step) {
  let container = createDiv();
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("margin", "4px");

  let label = createSpan(etichetta + ": ");
  label.style("width", "100px");
  label.parent(container);

  let slider = createSlider(min, max, val, step);
  slider.parent(container);

  switch (etichetta) {
    case "Allineamento": sliderAllinea = slider; break;
    case "Coesione": sliderCoesione = slider; break;
    case "Repulsione": sliderRepulsione = slider; break;
    case "Connessioni": sliderConnessioni = slider; break;
  }
}
