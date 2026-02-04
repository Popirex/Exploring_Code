/*
  Rules for the Sierpiński triangle:

  1. Take three points in a plane to form a triangle.
  2. Randomly select any point inside the triangle and consider that your current position.
  3. Randomly select any one of the three vertex points.
  4. Move half the distance from your current position to the selected vertex.
  5. Plot the current position.
  6. Repeat from step 3.
  
*/

class Vertex{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  disegna(){
    stroke(0, 217, 225);
    strokeWeight(10);
    point(this.x, this.y);
  }
  
}

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  disegna(){
    stroke(255, 0, 128);
    strokeWeight(2);
    point(this.x, this.y);
  }
}


function verificaPunto(p, va , vb, vc){
  
  let l1, l2, l3;
  
  l1 = ( ((vb.y-vc.y)*(p.x-vc.x)) + ((vc.x-vb.x)*(p.y-vc.y)) )/( ((vb.y-vc.y)*(va.x-vc.x))+((vc.x-vb.x)*(va.y-vc.y)) );
  
  l2 = ( ((vc.y - va.y)*(p.x - vc.x)) + ((va.x - vc.x)*(p.y - vc.y)) )/( ((vb.y - vc.y)*(va.x - vc.x))+((vc.x-vb.x)*(va.y - vc.y)) );
  
  l3 = 1 - l1 - l2;
  
  if(l1 >= 0 && l2 >= 0 && l3 >= 0){
    return true;
  }
  else{
    return false;
  }
  
}

let v1 = new Vertex(200, 50);
let v2 = new Vertex(27, 350);
let v3 = new Vertex(373, 350);


let vertici = [v1, v2, v3];
let punti = [];
let corrente;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("container-simulazione");
  
  
  // per iniziare con un punto che di sicuro è dentro il triangolo uso questo while
  corrente = new Point(random(27, 373), random(50, 350));
  while(!verificaPunto(corrente, v1, v2,v3)){
    corrente = new Point(random(27, 373), random(50, 350));
  }
  
  // una volta che ho un punto dentro il triangolo lo aggiungo all'array punti e proseguo
  punti.push(corrente);
  
  
}

function draw() {
  background(15, 52, 96);


  for(let punto of punti){
    punto.disegna();
  }
  for(let vertice of vertici){
    vertice.disegna();
  }
  
  
  
  //genero un numero casuale tra 0 e 2 compreso e seleziono un vertice casuale
  let numeroCasuale = int(random(0, 3));
  let verticeCasuale = vertici[numeroCasuale];
  
  // il nuovo punto è a metà della distanza tra il vertice e il punto precedente
  let nuovoPunto = new Point( (corrente.x + verticeCasuale.x)/2 , (corrente.y + verticeCasuale.y) / 2 );
  
  corrente = nuovoPunto;
  punti.push(corrente);

  
  
}