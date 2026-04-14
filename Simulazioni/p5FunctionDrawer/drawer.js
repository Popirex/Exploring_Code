let espressione = "";
let scala = 1;
let corretto = false;

const display = document.getElementById("display");

const bottoni = document.querySelectorAll(".math-button");

function getMax(){
    return width > height ? width : height;
}


function leggiSlider(){
    scala = document.getElementById("slider").value;
}


bottoni.forEach(bottone => {
    bottone.addEventListener("click", function(){
        corretto = false;
        const valore = this.dataset.value;

        espressione += valore;

        display.textContent = espressione;
    })
});

document.getElementById("clear").addEventListener("click", function(){
    espressione = "";
    display.textContent = espressione;
});

document.getElementById("uguale").addEventListener("click", function(){


    let valore;
    let x = 1;
    corretto = false;
    try {
        valore = eval(espressione);
    } catch (error) {
        display.textContent = "Syntax error!";
    }

    corretto = true;
    console.log(valore);
    
});


document.getElementById("canc").addEventListener("click", function(){
    if(espressione.length > 0){
        let caratteri = espressione.split('');
        espressione = "";
        caratteri.pop();
        caratteri.forEach(carattere => espressione += carattere );
        corretto = false;
        display.textContent = espressione;
    }
});

function DrawTicks(){
    push();
    strokeWeight(0.1);
    stroke(0);

    // disegno quelle in posizione 1 piu piccole
    line(1, -0.5, 1, 0.5);
    line(-1, -0.5, -1, 0.5);
    line(-0.5, -1, 0.5, -1);
    line(-0.5, 1, 0.5, 1);

    for(let i = 2; i <= getMax(); i++ ){
        
        line(i, -1, i, 1);
        line(-i, -1, -i, 1);
        line(-1, -i, 1, -i);
        line(-1, i, 1, i);
    }

  pop();
}

function DrawAxis(){
  line(0, -height/2, 0, height/2);
  line( -width/2, 0, width/2, 0 );


}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  frameRate(10);
}

function draw() {
  leggiSlider();
  background(220);
  text("scale: "+ scala + "x", 340, 390);
  translate(width/2, height/2);
  DrawAxis();
  scale(scala , - (scala));
  DrawTicks();

  
  strokeWeight(1);
  stroke(255, 0 , 0);
  
  beginShape();
  noFill();
  if(corretto){
    for(let x = -width/2; x <= width/2; x+=0.1){
        
        try {
               let y = eval(espressione);
                vertex(x, y); 
        } catch (error) {
            corretto = false;
        }
        
    }
  }
  
  endShape();
  stroke(0);
  
}