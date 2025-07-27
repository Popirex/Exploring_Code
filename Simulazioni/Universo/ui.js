const resetButton = document.getElementById("resetButton");
const sliderMassa = document.getElementById("massa_terra");


resetButton.addEventListener("click", () => {
  
  const valore_slider = sliderMassa.value;

  console.log(valore_slider);

    if (isNaN(valore_slider)) {
    valore_slider = 100;
    alert("Inserisci valori validi.");
    return;
  }


  // AGGIORNO LE VARIABILI LOCALI CON GLI INPUT DELLA UI
  massaTerra = valore_slider;
  raggioTerra = massaTerra / 2;

  // RESETTO I CONTATORI PER LE NUOVE PERCENTUALI AL TERMINE DELLA SIMULAZIONE


  // Ricrea fotoni
  let massaLuna = massaTerra / 81;
  let raggioLuna = raggioTerra / 3.7;
  let distanzaLuna = (80) * 3;
  let vInizialeTerra = 0.005;  //0.005
  let vInizialeLuna = 1.2


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