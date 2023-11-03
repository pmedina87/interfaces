import Tablero from "./Clases/Tablero.mjs";

const CUATRO_L = "4";
const CINCO_L = "5"; 
const SEIS_L = "6";
const SIETE_L = "7";

let canvas = document.querySelector("#canvas_juego");
let canvas_context = canvas.getContext("2d");
let opc_juego = document.querySelector("#opciones-juego");
let btn_jugar = document.querySelector("#btn-jugar");

// Imprimimos por consola las coordenadas actuales del mouse dentro del canvas
canvas.addEventListener("mousemove", (event) => {
	// console.log({x: event.offsetX, y: event.offsetY});
});

btn_jugar.addEventListener("click", () => {
	opc_juego.removeAttribute("hidden");
  btn_jugar.classList.add("hidden");
});


// tomo los datos del formulario para setear el juego (segun lo que crearon los usuario)
let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	
	let botonIzquierdoClickeado = false;
	
	function detectarClick(event){
		botonIzquierdoClickeado = true;
		// console.log("Mouse Down!" + botonIzquierdoClickeado);
		
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			// Se clickea el boton del mouse y además este se está dentro de la ficha actual 
			console.log((botonIzquierdoClickeado && tablero_juego.mouseDentroDeLaFicha(i, event) && tablero_juego.verificarFichaClickeadaEsJugadorTurnoActual(i)));
			if(botonIzquierdoClickeado && tablero_juego.mouseDentroDeLaFicha(i, event) && tablero_juego.verificarFichaClickeadaEsJugadorTurnoActual(i)){
				// Seteamos la ficha como clickeada
				tablero_juego.setearFichaComoClickeada(i);
				// Le asignamos las nuevas coordenadas (centra la ficha con respecto al mouse)
				tablero_juego.setearNuevasCoordenadasAFicha(i, event.offsetX, event.offsetY);
				return; // A la primera ficha que cumpla cortamos el bucle
			}
		}
	}
	

	function deseleccionarFichas(){
		botonIzquierdoClickeado = false;
		// console.log("Mouse Up!" + botonIzquierdoClickeado);
		tablero_juego.cambiarTurnoJugador();
		// Se desclickean todas las fichas
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			tablero_juego.setearFichaComoDesclickeada(i);
		}
	}
	
	
	function moverFicha(event){
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			// Se verifica si la ficha tiene su estado "clickeada" y ademas el mouse está dentro de la ficha 
			if(tablero_juego.fichaEstaSiendoClickeada(i, event)){
				// Seteamos las nuevas coordenadas de la ficha
				tablero_juego.setearNuevasCoordenadasAFicha(i, event.offsetX, event.offsetY);
			}
		}
	}
	
	canvas.addEventListener("mousedown", detectarClick);
	canvas.addEventListener("mouseup", deseleccionarFichas);
	
	canvas.addEventListener("click", ()=>{
		// console.log("Click");
	});
	
	canvas.addEventListener("mouseleave", deseleccionarFichas);
	canvas.addEventListener("mousemove", moverFicha);



	const dataForm = new FormData(formulario);

	let opctablero = dataForm.get("tablero");
	let desafio = dataForm.get("desafio");
	let jugador1 = dataForm.get("jugador1");
	let jugador2 = dataForm.get("jugador2");

  let fichasJugador = 0;

	// Asignamos cantidad de fichas x jugador en base al mood de juego seleccionado
	switch(opctablero){
		case CUATRO_L: fichasJugador = 21 ;break;
		case CINCO_L: fichasJugador = 28 ;break;
		case SEIS_L: fichasJugador = 36 ;break;
		case SIETE_L: fichasJugador = 45 ;break;
		default: fichasJugador = 21;
	}

	// Creeamos un tablero centrado en el cambas
	const tablero_juego = new Tablero(canvas_context, opctablero, desafio, jugador1, jugador2);
	tablero_juego.iniciarTiempo();


	function ejecutarJuego(){	
		tablero_juego.dibujar();
	}

	setInterval(ejecutarJuego, 10);
});


