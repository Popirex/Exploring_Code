// variabili globali
let cellSize = 30;
let grid = new Map();

let numeroPrede = 300;
let numeroPredatori = 3;

let distanzaContatto = 5; //sotto i 5px si toccano

let magnitudine_velocita = 10;



// *    GESTIONE RESIZING PAGINA

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// *    GESTIONE RESIZING PAGINA


//  funzione hash table
function aggiornaGriglia(gruppi){
  grid.clear();
  
  for(let gruppo of gruppi){
    for(let p of gruppo){
        let col = floor(p.pos.x / cellSize);
        let row = floor(p.pos.y / cellSize);
        
        let chiave = col + "," + row;
        
        if(!grid.has(chiave)){
        grid.set(chiave, []);
        }
        
        grid.get(chiave).push(p);
    }

    }
  
  
}



class Body {

    constructor(){

        this.maxForza = magnitudine_velocita / 2;
        if(this instanceof Boid){this.maxVel = magnitudine_velocita / 3;}
        else if(this instanceof Enemy){this.maxVel = magnitudine_velocita / 2;}
        this.maxAccelerazione = magnitudine_velocita / 2;

        this.pos = createVector( random(0, width), random(0, height));
        this.vel = p5.Vector.random2D().mult(random(1, this.maxVel / 2));
        this.acc = createVector();

        

        this.vicini = [];

    }

    inFrame(){
        if(this.pos.x < 0) this.pos.x = width;
        else if(this.pos.x >  width) this.pos.x = 0;
        else if(this.pos.y < 0) this.pos.y =  height;
        else if(this.pos.y > height) this.pos.y = 0;
    }

    muovi(grid){

        this.inFrame();

        if(this instanceof Boid){
            this.applicaForze(grid);
        }
        else if(this instanceof Enemy){
            this.caccia(grid);
        }
        

        this.vel.lerp(this.vel.copy().add(this.acc), 0.2);

        this.vel.limit(this.maxVel);

        this.pos.add(this.vel);

        this.acc.set(0, 0);
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
    if(this instanceof Boid){ 
        fill(70);
        noStroke();
        triangle(0, -5, 0, 5, 15, 0);
    }
    else if(this instanceof Enemy){
        fill(255, 0 , 0); 
        noStroke();
        triangle(0, -10, 0, 10, 20, 0);
    }
    pop();
    }

}

class Boid extends Body {

    constructor(x, y){
        super(x , y);

        this.allineamento = createVector();
        this.coesione = createVector();
        this.repulsione = createVector();

        this.fuga = createVector();

        this.pesoAllineamento = 1.0;
        this.pesoCoesione = 0.01 ;
        this.pesoRepulsione = 1.5;
        this.pesoFuga = 2;

        this.percezione = 100;
        this.percezioneNemici = 300;


    }

    applicaForze(grid){
        // trovo gli uccelli vicini
        this.uccelli_vicini(grid);

        //variabili locali

        let totale = 0;
        this.allineamento.set(0 , 0);
        this.coesione.set(0 , 0);
        this.repulsione.set(0 , 0);
        this.fuga.set(0, 0);

        for(let vicino of this.vicini){

            if ( vicino == this) continue;

            let distanza = dist(this.pos.x, this.pos.y, vicino.pos.x, vicino.pos.y);

            if(vicino instanceof Boid ){
                if(distanza <= this.percezione){

                    //allineamento
                    this.allineamento.add(vicino.vel);

                    //coesione
                    this.coesione.add(vicino.pos);

                    //repulsione
                    let differenza = p5.Vector.sub(this.pos , vicino.pos );
                    let forza = constrain ( 1 / (distanza + 0.01), 0, this.maxForza) // riduco la forza di repulsione in base alla distanza
                    differenza.setMag(forza);
                    this.repulsione.add(differenza);

                    totale++;

                }
            }
            else if(vicino instanceof Enemy){
                let distanza_nemico = dist(this.pos.x, this.pos.y, vicino.pos.x, vicino.pos.y);

                if(distanza_nemico <= this.percezioneNemici){
                    let differenza = p5.Vector.sub(this.pos, vicino.pos);

                    let forza = map( distanza_nemico, 0, this.percezioneNemici, this.maxForza, 0);

                    differenza.setMag(forza);
                    this.fuga.add(differenza);
                }
            }
        }

        if(totale > 0){

            this.allineamento.div(totale);
            this.allineamento.setMag(this.maxVel);
            this.allineamento.sub(this.vel);
            this.allineamento.limit(this.maxForza);

            this.coesione.div(totale);
            this.coesione.sub(this.pos);
            this.coesione.setMag(this.maxVel);
            this.coesione.sub(this.vel);
            this.coesione.limit(this.maxForza);

            
            this.repulsione.limit(this.maxForza);

            

            this.acc.add(this.allineamento.mult(this.pesoAllineamento));
            this.acc.add(this.coesione.mult(this.pesoCoesione));
            this.acc.add(this.repulsione.mult(this.pesoRepulsione));

            this.acc.add(this.fuga.mult(this.pesoFuga));
        }
    }


}

class Enemy extends Body{
    constructor(x, y){
        super(x, y);
        this.percezionePrede = 200;
        this.pesoInseguimento = 1;

        this.inseguimento = createVector();
    }

    cerca(){
        let vettore = p5.Vector.random2D();

        this.acc.add(vettore);
    }


    caccia(grid){
        this.inseguimento.set(0, 0);
        let vicini = 0;
        this.uccelli_vicini(grid);

        this.vicini = this.vicini.filter(v => v !== undefined && v !== null);

        for(let i = this.vicini.length - 1; i >= 0; i--){


            //controllo di non guardare me stesso
            if(this.vicini[i] == this) continue;

            let distanza = dist(this.pos.x, this.pos.y, this.vicini[i].pos.x, this.vicini[i].pos.y);

            if(this.vicini[i] instanceof Boid){

                if(distanza <= this.percezionePrede && distanza > distanzaContatto){
                    let differenza = p5.Vector.sub(this.vicini[i].pos, this.pos);
                    let forza = map(distanza, 0, this.percezionePrede, this.maxForza, 0);

                    differenza.setMag(forza);

                    this.inseguimento.add(differenza);

                    vicini++;

                }

                if(distanza <= distanzaContatto){
                    let indice = boids.indexOf(this.vicini[i]);
                    if(indice > -1){
                        boids.splice(indice, 1); 
                    }
                    this.vicini.splice(i, 1);
                }
            }
        }

        if(vicini > 0){
            this.acc.add(this.inseguimento.mult(this.pesoInseguimento));
        }else{
            this.cerca();       
        }
    }
}


let boids = [];
let predators = [];

let oggetti = [ boids, predators];

function setup(){
    createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < numeroPrede; i++){
        boids[i] = new Boid();
    }
    for(let j = 0; j < numeroPredatori; j++){
        predators[j] = new Enemy();
    }


}

function draw(){
    
    background('#6db3e8');



    aggiornaGriglia(oggetti);


    for(let gruppo of oggetti){
        for(let oggetto of gruppo){
            oggetto.muovi(grid);
            oggetto.disegna();
        }
    }

}