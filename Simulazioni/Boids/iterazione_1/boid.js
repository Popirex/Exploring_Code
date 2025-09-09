let altezza = 750;
let larghezza = 750;
let  magnitudine_velocita = 10;


class Boid{
    constructor(){
        this.pos = createVector(random(0, width), random(0, altezza));
        this.vel = createVector(random(-magnitudine_velocita, magnitudine_velocita) , random(-magnitudine_velocita, magnitudine_velocita));
        this.acc = createVector();  
        this.maxForza = 10;
        this.maxAccellerazione = 10;
        this.maxCoesione = 0.2;
        this.percezione = 100;
        this.maxVel = 10;
        this.raggio =  50;

        //tentativo 1 di implementazione hash table per interazioni tra oggetti->

        this.vicini = [];
    }


    show(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        fill(50);
        noStroke();
        triangle(0, -5, 0, 5, 15, 0);
        pop();
    }


    // AGGIORNAMENTO POSIZIONE, VELOCITA, ACCELLERAZIONE


    update(stormo){

        this.acc.mult(0);

        let repulsione =  this.repulsione(stormo);
        let allineamento = this.allinea(stormo);
        let coesione = this.coesione(stormo);

        repulsione.mult(sliderRepulsione.value());
        allineamento.mult(sliderAllinea.value());
        coesione.mult(sliderCoesione.value());
         
        this.acc.add(repulsione);
        this.acc.add(allineamento);
        this.acc.add(coesione);

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
    }

    inFrame(){
        if(this.pos.x < 0) this.pos.x = larghezza;
        else if(this.pos.x >  larghezza) this.pos.x = 0;
        else if(this.pos.y < 0) this.pos.y =  altezza;
        else if(this.pos.y > altezza) this.pos.y = 0;
    }

    //REGOLA DELL ALLINEAMENTO

    allinea(stormo){
        
        let totale = 0;
        let sterzata = createVector();
        for(let uccello of stormo){
            let d =  dist(this.pos.x, this.pos.y, uccello.pos.x, uccello.pos.y);
            if(uccello != this && d <= this.percezione){
                if(sliderConnessioni.value()){
                    strokeWeight(0.2);
                    stroke(255);
                    line(this.pos.x , this.pos.y ,uccello.pos.x , uccello.pos.y);
                }
                sterzata.add(uccello.vel);
                totale++;
            }
        }
        if(totale > 0) {
            sterzata.div(totale);
            sterzata.setMag(this.maxForza);
            sterzata.sub(this.vel);
            sterzata.limit(this.maxAccellerazione);
        }
        else if(totale == 0) sterzata = createVector();
        return  sterzata;
    }

    //REGOLA  DELLA COESIONE

    coesione(stormo){
        let totale = 0;
        let sterzata = createVector();
        for(let uccello of stormo){
            let d =  dist(this.pos.x, this.pos.y, uccello.pos.x, uccello.pos.y);
            if(uccello.pos != this.pos && d <= this.percezione){
                sterzata.add(uccello.pos);
                totale++;
            }
        }
        if(totale > 0) {
            sterzata.div(totale);
            sterzata.sub(this.pos);
            sterzata.setMag(this.maxForza);
            sterzata.sub(this.vel);
            sterzata.limit(this.maxCoesione);
        }
        else if(totale  ==  0) sterzata =  createVector();
        return sterzata;
    }

    repulsione(stormo){
        let totale = 0;
        let sterzata = createVector();
        for(let uccello of stormo){
            let d =  dist(this.pos.x, this.pos.y, uccello.pos.x, uccello.pos.y);
            if(uccello.pos != this.pos && d <= this.raggio){
                let  diff = p5.Vector.sub(this.pos, uccello.pos);
                diff.div(d);
                sterzata.add(diff);
                totale++;
            }
        }
        if(totale > 0) {
            sterzata.div(totale);
            sterzata.setMag(this.maxForza);
            sterzata.sub(this.vel);
            sterzata.limit(this.maxCoesione);
        }
        else if(totale  ==  0) sterzata =  createVector();
        return sterzata;
    }

}