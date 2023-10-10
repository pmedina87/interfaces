let cargado = false;
let barra = document.querySelector("#barra");
let porcentaje = document.querySelector("#porcentaje");
let div_cargando = document.querySelector(".cargando");
let div_pagina = document.querySelector(".container-pagina");

function cargarPagina() {
	let progreso = 0;
	const intervalo = setInterval(function () {
		if (progreso >= 100) {
			clearInterval(intervalo);
			div_cargando.classList.toggle("hidden");
			div_pagina.classList.toggle("hidden");
		} else {
			progreso++;
			barra.setAttribute("value", progreso);
			porcentaje.textContent = progreso + "%";
		}
	}, 50); // 50 * 100 = 5000 ms

	cargado = true;
}

if (!cargado) { 	
	cargarPagina();
}






let popup = document.querySelector("#popup");
let imagenEnPopup = document.getElementById("imagenEnPopup");
let cerrarPopup = document.getElementById("cerrarPopup");
let isMeGusta = null;

function abrir(pos) {
    let imagenPopup = document.querySelector("#img"+ pos);
    popup.style.display = "flex";
	imagenEnPopup.src = imagenPopup.src;
}

cerrarPopup.addEventListener("click", () => {
	popup.style.display = "none";
});

function megusta(pos) {
    let img = document.querySelector("#imgmg" + pos);
    
    if(isMeGusta == null || !isMeGusta) {
        img.src = "/src/assets/img/juego/corazon.svg";
        img.classList.toggle("animacion-mg");
        img.classList.toggle("animacion-nmg");
        isMeGusta = true;
    } else {
        img.src = "/src/assets/img/iconos/icono_me_gusta.svg";
        img.classList.toggle("animacion-nmg");
        img.classList.toggle("animacion-mg");
        isMeGusta = false;
    }
}