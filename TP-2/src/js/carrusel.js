
let carruselContainer = document.querySelector(".carrusel__container");
let carruselCards = document.querySelector(".carrusel__cards");
let btnIzqRecomendados = document.querySelector("#btn_izq_recomnedados");
let btnDerRecomendados = document.querySelector("#btn_der_recomnedados");
let divRecomendados = document.querySelector("#recomendadosCard");
let divAccion = document.querySelector("#accionCard");
let divTerror = document.querySelector("#terrorCard");
let divVestir = document.querySelector("#vestirCard");
let btnIzqAccion = document.querySelector("#btn_izq_accion");
let btnDerAccion = document.querySelector("#btn_der_accion");
let btnIzqTerror = document.querySelector("#btn_izq_terror");
let btnDerTerror = document.querySelector("#btn_der_terror");
let btnIzqVestir = document.querySelector("#btn_izq_vestir");
let btnDerVestir = document.querySelector("#btn_der_vestir");

let posActRecomendados = 0;
let posActAccion = 0;
let posActTerror = 0;
let posActVestir = 0;

// carrusel recomendados
btnDerRecomendados.addEventListener("click", () => {
	let maxPosition = divRecomendados.children.length - 3;
	if (posActRecomendados < maxPosition) {
		posActRecomendados++;
		actualizarTransform(divRecomendados, posActRecomendados);
	}
});

btnIzqRecomendados.addEventListener("click", () => {
	if (posActRecomendados > 0) {
		posActRecomendados--;
		actualizarTransform(divRecomendados, posActRecomendados);
	}
});

// carrusel accion
btnDerAccion.addEventListener("click", () => {
	let maxPosition = divAccion.children.length - 3;
	if (posActAccion < maxPosition) {
		posActAccion++;
		actualizarTransform(divAccion, posActAccion);
	}
});

btnIzqAccion.addEventListener("click", () => {
	if (posActAccion > 0) {
		posActAccion--;
		actualizarTransform(divAccion, posActAccion);
	}
});

// carrusel terror
btnDerTerror.addEventListener("click", () => {
	let maxPosition = divTerror.children.length - 3;
	if (posActTerror < maxPosition) {
		posActTerror++;
		actualizarTransform(divTerror, posActTerror);
	}
});

btnIzqTerror.addEventListener("click", () => {
	if (posActTerror > 0) {
		posActTerror--;
		actualizarTransform(divTerror, posActTerror);
	}
});


// carrusel vestir
btnDerVestir.addEventListener("click", () => {
	let maxPosition = divVestir.children.length - 3;
	if (posActVestir < maxPosition) {
		posActVestir++;
		actualizarTransform(divVestir, posActVestir);
	}
});

btnIzqVestir.addEventListener("click", () => {
	if (posActVestir > 0) {
		posActVestir--;
		actualizarTransform(divVestir, posActVestir);
	}
});

// funcion general
function actualizarTransform(div, pos) {
	let cardWidth = div.children[0].offsetWidth;
	let translateX = -pos * cardWidth;
	div.style.transform = `translateX(${translateX}px)`;
}
