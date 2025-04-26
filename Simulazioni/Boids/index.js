
let stormo = [];
let sliderAllinea, sliderCoesione,sliderRepulsione,sliderStato;



function setup() {
  createCanvas(larghezza, altezza);
  sliderAllinea  = createSlider(0, 1, 0.5, 0.01);
  sliderCoesione  = createSlider(0, 5, 1, 0.1);
  sliderRepulsione  = createSlider(0, 5, 2.5, 0.1);
  sliderStato = createSlider(0, 1, 0, 1);
  
  for(let i = 0; i < 100 ; i++){
    stormo.push(new Boid());
  }
  }


function draw() {
  background('#6db3e8');
  for(let uccello of stormo){
    uccello.inFrame();
    uccello.update(stormo);
    uccello.show();
  }
}