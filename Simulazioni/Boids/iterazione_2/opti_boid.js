//locali per hashmap
let cellSize = 10;
let grid = new Map();

//locali ber boid
let magnitudine_velocita = 10;

function aggiornaGriglia(palle){
  grid.clear();
  
  for(let p of palle){
    let col = floor(p.pos.x / cellSize);
    let row = floor(p.pos.y / cellSize);
    
    let chiave = col + "," + row;
    
    if(!grid.has(chiave)){
      grid.set(chiave, []);
    }
    
    grid.get(chiave).push(p);
  }
  
}



class Boid {

  constructor(){

    this.pos = createVector(random(0, width), random(0, height));
    this.vel = createVector(random(-magnitudine_velocita, magnitudine_velocita), random(-magnitudine_velocita, magnitudine_velocita));
    this.acc = createVector();

    this.maxForza = magnitudine_velocita / 2;
    this.maxAccelerazione = magnitudine_velocita / 2;
    this.maxCoesione = magnitudine_velocita / 100;
    this.maxVel = magnitudine_velocita / 2;
    this.percezione = 100;
    


    this.vicini = [];

    this.allineamento = createVector();
    this.coesione = createVector();
    this.repulsione = createVector();
    this.mostra_connessioni = 0;

  }

  uccelli_vicini(grid){
    let col = floor(this.pos.x / cellSize);
    let row = floor(this.pos.y / cellSize);
    
    this.vicini = [];
    
    for(let dx = -1; dx <= 1; dx++){
      
      for(let dy = -1; dy <= 1; dy++){


        let chiave = (col+dx) + "," + (row+dy);
        if(grid.has(chiave)){
          this.vicini = this.vicini.concat(grid.get(chiave));
        }
      }
    }
  }

  disegna(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    fill(125);
    noStroke();
    triangle(0, -5, 0, 5, 15, 0);
    pop();
  }

  inFrame(){
    if(this.pos.x < 0) this.pos.x = width;
    else if(this.pos.x >  width) this.pos.x = 0;
    else if(this.pos.y < 0) this.pos.y =  height;
    else if(this.pos.y > height) this.pos.y = 0;
  }


  connetti(){
    let totale = 0;
    this.allineamento.set(0, 0);
    this.repulsione.set(0, 0);
    this.coesione.set(0, 0);

    for(let vicino of this.vicini){
      if(vicino != this){
        
      
      let distanza = dist(this.pos.x, this.pos.y, vicino.pos.x, vicino.pos.y);

      if(distanza <= this.percezione){

        //disegno linee di connessione
        if(this.mostra_connessioni){
          strokeWeight(1);
          stroke(1);
          line(this.pos.x, this.pos.y, vicino.pos.x, vicino.pos.y);
        }
        //tengo conto se ha vicini oppure no
        totale++;

        //calcolo allineamento

        this.allineamento.add(vicino.vel);



        //calcolo repulsione
        let diff = p5.Vector.sub(this.pos, vicino.pos);
        diff.div(distanza);
        this.repulsione.add(diff);


        if(distanza <= this.percezione - 60){
          //calcolo coesione
          this.coesione.add(vicino.pos);
        }

      }
    }
    }

    if(totale > 0) {

      //limito allineamento

      this.allineamento.div(totale);
      this.allineamento.setMag(this.maxForza);
      this.allineamento.sub(this.vel);
      this.allineamento.limit(this.maxAccelerazione);

      //limito repulsione
      this.repulsione.div(totale);
      this.repulsione.setMag(this.maxForza);
      this.repulsione.sub(this.vel);
      this.repulsione.limit(this.maxCoesione);

      //limito coesione
      this.coesione.div(totale);
      this.coesione.sub(this.pos);
      this.coesione.setMag(this.maxForza);
      this.coesione.sub(this.vel);
      this.coesione.limit(this.maxCoesione);

    }
    else if(totale == 0){
      this.allineamento = createVector();

      this.coesione = createVector();
    
      this.repulsione = createVector();
    }
  }
  
  anima(){
    this.acc.mult(0);

    this.acc.add(this.allineamento);
    this.acc.add(this.repulsione.mult(3));
    this.acc.add(this.coesione.mult(0.8));

    this.pos.add(this.vel);

    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
  }
  
  
}

let boids = [];

function setup() {
  createCanvas(1920, 1080);
  for(let i = 0; i < 1000; i++){
    boids[i] = new Boid();
  }
}

function draw() {
  
  background('#6db3e8');

  aggiornaGriglia(boids);
  
  for(let bird of boids){
    
    bird.inFrame();
    bird.uccelli_vicini(grid);
    bird.connetti();
    bird.anima();
    bird.disegna();

  }
  
    
}