import Tablero from "./Clases/Tablero.mjs";

const CUATRO_L = "4";
const CINCO_L = "5"; 
const SEIS_L = "6";
const SIETE_L = "7";


let canvas = document.querySelector("#canvas_juego");
let canvas_context = canvas.getContext("2d");
let opc_juego = document.querySelector("#opciones-juego");
let btn_jugar = document.querySelector("#btn-jugar");
let btn_arrancar = document.querySelector("#btnArrancar");
let inicio = document.querySelector("#inicio")//variable del boton arrancar juego
// let popup = document.querySelector("#popup");

document.getElementById("reset").addEventListener("click", function() {
	// popup.classList.toggle('hidden');
	location.reload();
});
  

// Oculta el canvas inicialmente
canvas.style.display = "none";


// Imprimimos por consola las coordenadas actuales del mouse dentro del canvas
canvas.addEventListener("mousemove", (event) => {
	// console.log({x: event.offsetX, y: event.offsetY});
});

btn_jugar.addEventListener("click", () => {
	opc_juego.removeAttribute("hidden");
  	btn_jugar.classList.add("hidden");
 
});	

let tablero_juego = null;

// tomo los datos del formulario para setear el juego (segun lo que crearon los usuario)
let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	btn_arrancar.classList.toggle('hidden');

	inicio.style.display="none";//oculto la imagen de inicio
	canvas.style.display = "block";//"levanto" el canvas
	let botonIzquierdoClickeado = false;
	
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
	
	tablero_juego = new Tablero(canvas_context, opctablero, desafio, jugador1, jugador2);
	tablero_juego.iniciarTiempo();
	
	// ejecutarJuego();
	setInterval(ejecutarJuego, 10);

	canvas.addEventListener("mousedown", detectarClick);
	canvas.addEventListener("mouseup", deseleccionarFichas);
	canvas.addEventListener("mouseleave", deseleccionarFichas);
	canvas.addEventListener("mousemove", moverFicha);

	function detectarClick(event){
		botonIzquierdoClickeado = true;
		// console.log("Mouse Down!" + botonIzquierdoClickeado);
		
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			// Se clickea el boton del mouse y además este se está dentro de la ficha actual 
			if(botonIzquierdoClickeado && tablero_juego.mouseDentroDeLaFicha(i, event) && tablero_juego.verificarFichaClickeadaEsJugadorTurnoActual(i)){
				// Seteamos la ficha como clickeada
				tablero_juego.setearFichaComoClickeada(i);
				// Le asignamos las nuevas coordenadas (centra la ficha con respecto al mouse)
				tablero_juego.setearNuevasCoordenadasAFicha(i, event.offsetX, event.offsetY);
				return; // A la primera ficha que cumpla cortamos el bucle
			}
		}
	}
	

	function deseleccionarFichas(event){
		botonIzquierdoClickeado = false;
		tablero_juego.resetearAyudaVisualControladorTiroValido();
		// console.log("Mouse Up!" + botonIzquierdoClickeado);
		// Se desclickean todas las fichas
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			if(tablero_juego.fichaEstaSiendoClickeada(i, event)){
				if(tablero_juego.fichaEnControlador(event)){
					let indice = tablero_juego.getIndiceColumna(event);
					if(indice != null){
						if(tablero_juego.isColumnaConEspacio(indice)){
							tablero_juego.agregarFicha(tablero_juego.fichas[i], indice);
							// Si la ficha se logró poner exitosamente se cambia el turno del jugador
							tablero_juego.cambiarTurnoJugador();							
						}else{
							tablero_juego.devolverFichaPosOriginal(i);		
						}
					}
				}else{
					tablero_juego.devolverFichaPosOriginal(i);
				}
			}
			tablero_juego.setearFichaComoDesclickeada(i);
		}
	}
	
	
	function moverFicha(event){
		for(let i = tablero_juego.fichas.length-1;i >= 0;i--){
			// Se verifica si la ficha tiene su estado "clickeada" y ademas el mouse está dentro de la ficha 
			if(tablero_juego.fichaEstaSiendoClickeada(i, event)){
				// Seteamos las nuevas coordenadas de la ficha
				tablero_juego.setearNuevasCoordenadasAFicha(i, event.offsetX, event.offsetY);
				tablero_juego.ayudaVisualControladorTiroValido(event.offsetX, event.offsetY);
			}
		}
	}

	function ejecutarJuego(){
		// if(tablero_juego.ganadorJuego == null) {
			tablero_juego.dibujar();
		// 	ejecutarJuego();
		// }	
	}

});


