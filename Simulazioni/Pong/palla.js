class Palla  {

    constructor(){
      this.pos = createVector(w/2, h/2);
      this.r = 20;
      this.vel = createVector(random(5,15), random(-8,8));
    }
  

    creaPalla(){
      noStroke();
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
  
    controllaCollisioniPareti(giocatoreSinistro, giocatoreDestro){
      //collisione con le pareti verticali
      if(this.pos.x > w - this.r/2){
        this.pos = createVector(w/2, h/2);
        this.vel = this.vel = createVector(random(10,20), random(-8,8));
        giocatoreSinistro.p++;
      }
      else if(this.pos.x < 0 + this.r/2){
        this.pos = createVector(w/2, h/2);
        this.vel = createVector(random(10,20), random(-8,8));
        giocatoreDestro.p++;
      }

      //collisione con le pareti orizzontali
      else if(this.pos.y > h-this.r/2  || this.pos.y < 0 + this.r/2){
        this.vel = createVector(this.vel.x, (this.vel.y*(-1)));
      }
    }
  
    aggiornaPosizione(){
      this.pos.add(this.vel);
    }

    collisioneGiocatore(giocatoreSinistro, giocatoreDestro){
      if(giocatoreSinistro.pos.y < this.pos.y && this.pos.y < giocatoreSinistro.pos.y+giocatoreSinistro.h){

        if(giocatoreSinistro.pos.x+giocatoreSinistro.w > this.pos.x){
          this.vel.x*=-1;
          
          }
        }
        //this.pos.y deve essere compreso tra giocatore.pos.y e giocatore.pos.y + giocatore.h
      if(giocatoreDestro.pos.y < this.pos.y && this.pos.y < giocatoreDestro.pos.y+giocatoreDestro.h){
      //giocatore.pos.x < this.pos
        if(giocatoreDestro.pos.x < this.pos.x){
          this.vel.x*=-1;
        }
      }
    }
    
}