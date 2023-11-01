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

document.addEventListener("DOMContentLoaded", function () {

	const slides = document.querySelectorAll(".carousel-slide");

	let currentIndex = 0;

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.style.transform = `translateX(${100 * (i - index)}%)`;
		});
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		showSlide(currentIndex);
	}

	// Configura un temporizador para avanzar automáticamente cada 3 segundos (3000 ms)
	setInterval(nextSlide, 3000);

	// Muestra el primer slide
	showSlide(currentIndex);
});
