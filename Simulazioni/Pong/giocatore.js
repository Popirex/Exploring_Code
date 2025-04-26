const w = 800;
const h = 600;
class Giocatore {

    constructor(x, a, b, colore){
      this.pos = createVector(x, mouseY);
      this.w = a;
      this.h = b;
      this.p = 0;
      this.c = colore;
    }
  
    disegnaGiocatore(){
      noStroke();
      fill(this.c);
      rect((this.pos.x), (this.pos.y), this.w, this.h);
    }
  
    controllaPosizione(){
      this.pos.y = mouseY-(this.h/2);
      if(this.pos.y <= 0){
        this.pos.y = 0;
      }
      else if(this.pos.y >=h-(this.h)){
        this.pos.y = h-this.h;
      }
    }

    aggiornaPunteggio(){
      stroke(2);
      fill(this.c);
      textSize(50);
      if(this.pos.x == 33){
        text(this.p, width/2 - this.w*2, 50);
      }
      else{
        text(this.p, width/2 + this.w*2, 50);
      }
    }
  };