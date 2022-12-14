function rastro(evento){
	let dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = evento.pageX+"px";
	dot.style.top = evento.pageY+"px";
	document.body.appendChild(dot);
}

document.addEventListener("mousemove", function(e) {
	let myDivs = document.querySelectorAll("div");
	if(myDivs.length <= 8){
		rastro(e);
	}
	else{
		myDivs[0].remove();
		rastro(e);
	}

})