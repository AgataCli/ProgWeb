function chamar(){
    let raio = document.querySelector("#mInput").value;
    let area = document.querySelector("#area");
    let circun = document.querySelector("#circun");


    area.value = (Math.PI * raio*raio).toFixed(2);
    circun.value = (2 * Math.PI * raio).toFixed(2);
}