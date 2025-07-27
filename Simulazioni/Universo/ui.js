const resetButton = document.getElementById("resetButton");
const sliderMassa = document.getElementById("massa_terra");
const sliderVelocitaTerra = document.getElementById("velocita_terra");
const sliderVelocitaLuna = document.getElementById("velocita_luna");


resetButton.addEventListener("click", () => {
  
  const valore_sliderMassa = parseFloat(sliderMassa.value);

  const valore_sliderTerra = parseFloat(sliderVelocitaTerra.value);
  const valore_sliderLuna = parseFloat(sliderVelocitaLuna.value);


    if (isNaN(valore_sliderMassa) || isNaN(valore_sliderTerra) || isNaN(valore_sliderLuna)) {
    valore_sliderMassa = 100;
    valore_sliderTerra = 0.005;
    valore_sliderLuna = 1.2;
    alert("Inserisci valori validi.");
    return;
  }


  // AGGIORNO LE VARIABILI LOCALI CON GLI INPUT DELLA UI
  massaTerra = valore_sliderMassa;
  raggioTerra = massaTerra / 2;

  // RESETTO I CONTATORI PER LE NUOVE PERCENTUALI AL TERMINE DELLA SIMULAZIONE


  // Ricrea fotoni
  let massaLuna = massaTerra / 81;
  let raggioLuna = raggioTerra / 3.7;
  let distanzaLuna = (80) * 3;
  vInizialeTerra = valore_sliderTerra;  //0.005
  vInizialeLuna = valore_sliderLuna;


  let xTerra = 400;
  let yTerra = 400;
  let xLuna = xTerra + distanzaLuna;

  //CREO I DUE NUOVI PIANETI
  terra = new Pianeta(xTerra, yTerra,vInizialeTerra, massaTerra, raggioTerra, 0 , 150 , 255);
  luna = new Pianeta(xLuna, yTerra, vInizialeLuna,massaLuna, raggioLuna, 242, 242, 118);

  //CREO LE STELLE
  for(let i = 0; i < 2000; i++){
    let raggio = random(0,3);
    stelle[i] = new Stella(random(0,width), random(0, height), raggio, raggio);
  }
});