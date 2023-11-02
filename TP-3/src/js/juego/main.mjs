import Tablero from "./Clases/Tablero.mjs";

const CUATRO_L = 4;
const CINCO_L = 5; 
const SEIS_L = 6;
const SIETE_L = 7;

let canvas = document.querySelector("#canvas_juego");
let canvas_context = canvas.getContext("2d");
let opc_juego = document.querySelector("#opciones-juego");
let btn_jugar = document.querySelector("#btn-jugar");

// Imprimimos por consola las coordenadas actuales del mouse dentro del canvas
canvas.addEventListener("mousemove", (event) => {
	console.log({x: event.offsetX, y: event.offsetY});
})

btn_jugar.addEventListener("click", () => {
	opc_juego.removeAttribute("hidden");
  btn_jugar.classList.add("hidden");
})


// tomo los datos del formulario para setear el juego (segun lo que crearon los usuario)
let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	const dataForm = new FormData(formulario);

	let tablero = dataForm.get("tablero");
	let desafio = dataForm.get("desafio");
	let jugador1 = dataForm.get("jugador1");
	let jugador2 = dataForm.get("jugador2");

  let fichasJugador = 0;

	// Asignamos cantidad de fichas x jugador en base al mood de juego seleccionado
	switch(tablero){
		case CUATRO_L: fichasJugador = 21 ;break;
		case CINCO_L: fichasJugador = 28 ;break;
		case SEIS_L: fichasJugador = 36 ;break;
		case SIETE_L: fichasJugador = 45 ;break;
	}

	// Creeamos un tablero centrado en el cambas
	const tablero_juego = new Tablero(canvas_context, tablero);
	
	tablero_juego.dibujar();

	let jug1 = crearJugador(jugador1);
	let jug2 = crearJugador(jugador2);
});

function crearJugador(jugador) {
	let jugador_creado;
	if (jugador != "") {
		jugador_creado = new Jugador(jugador);
		cont_jugador++;
	} else {
		cont_jugador++;
		let nombre = "jugador " + cont_jugador;
		jugador_creado = new Jugador(nombre);
	}
	return jugador_creado;
}
