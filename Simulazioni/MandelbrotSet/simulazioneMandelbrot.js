let iterazioniMax = 100;
let minReale = -2.5;
let maxReale = 1;
let minImmaginario = -1.25;
let maxImmaginario = 1.25;

function calcolaMandelbrot(ca, cb){

    let za = 0; // parte reale
    let zb = 0;  // parte immaginaria
    let n = 0; // partenza per le iterazioni

    while( n < iterazioniMax){
        // visto che il controllo che voglio fare è |z| > 2 -> (z*z) > 4 è equivalente e risparmia risorse ( non uso sqrt)
        za2 = za * za;
        zb2 = zb * zb;

        if(za2 + zb2 > 4){
            break;
        }

        let nuovoZa = za2 - zb2 + ca;
        let nuovoZb = 2 * za * zb + cb;

        za = nuovoZa;
        zb = nuovoZb;
        n++;

    }

    return n;

}

function disegnaMandelbrot(){
    loadPixels(); // funzione che mi prepara l'array di pixel da manipolare;

    for( let x = 0; x < width; x++){
        for(let y = 0; y < innerHeight; y++){

            // calcolo le cordinate Complesse mappandole con quelle reali
            let a = map(x, 0 , width, minReale, maxReale);
            let b = map( y , 0 , innerHeight, minImmaginario, maxImmaginario);

            let n = calcolaMandelbrot(a, b); // ottengo il numero di iterazioni necessarie per verificare se il punto è dentro oppure no

            let luminosita = map(n , 0 , iterazioniMax, 0 , 255);
            let colore;
            if( n == iterazioniMax){
                colore = color(0);
            }
            else{
                let hue = map( n , 0, iterazioniMax, 0, 360); // tipo di scala di colore che si vuole avere
                colorMode(HSB);
                colore = color(hue % 360, 80, luminosita);
                colorMode(RGB);
            }

            let indicePixel = ( x + y * width) * 4;
            pixels[indicePixel + 0] = red(colore);
            pixels[indicePixel + 1] = green(colore);
            pixels[indicePixel + 2] = blue(colore);
            pixels[indicePixel + 3] = 255;
        }
    }
    updatePixels();
}

function setup(){
    let schermo = createCanvas(800, 570);
    schermo.parent("container-simulazione");
    pixelDensity(1);
    disegnaMandelbrot();
}

function draw(){

    
}