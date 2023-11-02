import Tablero from "./Clases/Tablero.mjs";

const CUATRO_L = 4;
const CINCO_L = 5; 
const SEIS_L = 6;
const SIETE_L = 7;

let canvas = document.querySelector("#canvas_juego");
let canvas_context = canvas.getContext("2d");
let opc_juego = document.querySelector("#opciones-juego");
let btn_jugar = document.querySelector("#btn-jugar");

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

  let posXInicioTablero = 0;
	let posYInicioTablero = 0;
  let fichasJugador = 0;

	// setear dinamicamente posX y posY de donde comienza el tablero, segun el tipo.
	if (tablero == CUATRO_L) {
		posXInicioTablero = 195;
		posYInicioTablero = 50;
		fichasJugador = 21;
	}
	if (tablero == CINCO_L) {
		posXInicioTablero = 200;
		posYInicioTablero = 55;
		fichasJugador = 28;
	}
	if (tablero == SEIS_L) {
		posXInicioTablero = 215;
		posYInicioTablero = 65;
		fichasJugador = 36;
	}
	if (tablero == SIETE_L) {
		posXInicioTablero = 215;
		posYInicioTablero = 40;
		fichasJugador = 45;
	}

	// Creeamos un tablero centrado en el cambas
	let tablero_juego = new Tablero(canvas_context, tablero);
	

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
