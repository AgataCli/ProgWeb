let botao = document.querySelector("#press");

botao.onclick = function(){
    let a1 = document.querySelector("#a1").value;
    let a2 = document.querySelector("#a2").value;
    let a3 = document.querySelector("#a3").value;
    let a4 = document.querySelector("#a4").value;
    let a5 = document.querySelector("#a5").value;
    let larg = document.querySelector("#larg").value;

    let b1 = document.querySelector("#b1");
    let b2 = document.querySelector("#b2");
    let b3 = document.querySelector("#b3");
    let b4 = document.querySelector("#b4");
    let b5 = document.querySelector("#b5");

    b1.style.height = a1+"px";
    b1.style.width = larg+"px";
    b2.style.height = a2+"px";
    b2.style.width = larg+"px";
    b3.style.height = a3+"px";
    b3.style.width = larg+"px";
    b4.style.height = a4+"px";
    b4.style.width = larg+"px";
    b5.style.height = a5+"px";
    b5.style.width = larg+"px";

    
}