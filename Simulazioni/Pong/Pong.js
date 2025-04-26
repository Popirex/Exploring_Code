/*what we want is to earn a point every time we score to the opponent.
ball velocity and speed should be affected by rectangles (Players)*/

let palla;
let punteggioSinistro = 0;
let punteggioDestro = 0;
let inizio, corrente;

function setup() {
  createCanvas(w, h);
  frameRate(30);

  palla = new Palla();
  giocatoreSinistro = new Giocatore(33, 33, 200, 'green');
  giocatoreDestro = new Giocatore(733, 33, 200, 'purple');
}

function draw() {
  background(0);
  frameRate(60);

  giocatoreSinistro.controllaPosizione();
  giocatoreDestro.controllaPosizione();
  giocatoreSinistro.disegnaGiocatore();
  giocatoreDestro.disegnaGiocatore();
  
  //aggiorno il punteggio
  giocatoreSinistro.aggiornaPunteggio();
  giocatoreDestro.aggiornaPunteggio();

  palla.creaPalla();
  palla.controllaCollisioniPareti(giocatoreSinistro, giocatoreDestro);
  palla.aggiornaPosizione();
  palla.collisioneGiocatore(giocatoreSinistro, giocatoreDestro);
}