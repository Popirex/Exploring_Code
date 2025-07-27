const G = 1;
let slider;

let terra;
let luna;

massaTerra = 100;
raggioTerra = massaTerra / 2;

 // CREO LA STRUTTURA DI UNA STELLA
class Stella {
  constructor(x , y, raggio){
    this.x = x;
    this.y = y;
    this.r = raggio;
    this.colore = 255;
  }

  creaStella(){
    noStroke();
    fill(this.colore);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//CALCOLO LA FORZA GRAVITAZIONALE TRA I DUE PIANETI;
function calcolaForza(p1, p2) {
  let dir = p5.Vector.sub(p1.pos, p2.pos); // Vettore direzione
  let distanza = constrain(dir.mag(), 10, 100);
  let forzaMag = (G * p1.m * p2.m) / (distanza * distanza);
  
  dir.normalize();
  
  dir.mult(forzaMag);
  
  return dir;
}

//CREO LA STRUTTURA DI UN PIANETA

class Pianeta {

  //DEFINISCO LE VARIABILI DEL PIANETA
   
  constructor(x, y, vIniziale, massa, raggio, rosso, verde, blu) {
 
    this.pos =  createVector(x,y);
    this.vel = createVector(0, vIniziale);
    this.acc = createVector(0, 0);
    this.m = massa;
    this.r = raggio;
    this.rosso = rosso;
    this.verde = verde;
    this.blu = blu;
    this.traiet = [];
    }

    //FUNZIONE CHE APPLICA LA FORZA GRAVITAZIONALE AL VETTORE ACCELERAZIONE DEL PIANETA
  
  applicaForza(force) {
    let f = p5.Vector.div(force, this.m); // F = ma → a = F/m
    this.acc.add(f);
  }

  //FUNZIONE CHE AGGIORNA LA VELOCITA E LA POSIZIONE DEL PIANETA IN BASE ALLA FORZA GRAVITAZIONALE
  aggiorna() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.traiet.push(this.pos.copy());
    
  }
  
  //FUNZIONE CHE DISEGNA LA TRAIETTORIA DEL PIANETA
  disegnaTraiettoria(){
    noFill();
    stroke(0, 255, 0);
    beginShape();
    for(let p of this.traiet){
      vertex(p.x,p.y);
    }
    endShape();
      
    }

    //FUNZIONE CHE DISEGNA IL PIANETA
  
  creaPianeta (){
    noStroke();
    fill(this.rosso, this.verde, this.blu);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r *2);
  }
}

let stelle = [];

function setup() {
  createCanvas(800, 800);
  frameRate(120);
  //DATI DEI DUE PIANETI
  let massaLuna = massaTerra / 81;
  let raggioLuna = raggioTerra / 3.7;
  let distanzaLuna = (80) * 3;
  let vInizialeTerra = 0.005;  //0.005
  let vInizialeLuna = 1.2


  let xTerra = width / 2;
  let yTerra = height / 2;
  let xLuna = xTerra + distanzaLuna;

  //CREO I DUE NUOVI PIANETI
  terra = new Pianeta(xTerra, yTerra,vInizialeTerra, massaTerra, raggioTerra, 0 , 150 , 255);
  luna = new Pianeta(xLuna, yTerra, vInizialeLuna,massaLuna, raggioLuna, 242, 242, 118);

  //CREO LE STELLE
  for(let i = 0; i < 2000; i++){
    let raggio = random(0,3);
    stelle[i] = new Stella(random(0,width), random(0, height), raggio, raggio);
  }
  
}

function draw() {

  console.log(massaTerra),


  background(0);
  for(let i = 0; i <2000; i++){
    stelle[i].creaStella();
  }



  let forza = calcolaForza(terra, luna);
  terra.applicaForza(forza);
  terra.aggiorna();
  luna.applicaForza(forza);
  luna.aggiorna();
  
  terra.creaPianeta();
  terra.disegnaTraiettoria();
  luna.creaPianeta();
  luna.disegnaTraiettoria();
}