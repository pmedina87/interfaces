import Rectangle from "./Rectangle.mjs";
import Casillero from "./Casillero.mjs";

export default class Tablero {
	constructor(contexto, tipo) {
		this.posX = contexto.canvas.getAttribute("width") / 2;
		this.posY = contexto.canvas.getAttribute("height") / 2;
		this.contexto = contexto;
		this.tipo = tipo;
		
		this.ancho = this.setAnchoTablero();
		this.alto = this.setAltoTablero();
		
		this.filas = this.setFilasTablero();
		this.columnas = this.setColumnasTablero();
		
		this.background = new Rectangle(this.contexto, this.contexto.canvas.width, this.contexto.canvas.height, "rgb(130, 20, 60)");
		this.casilleros = [];
		this.crearCasilleros();
	}
	
	/**
	 * Consultar con los chicos:
	 * 
	 * Si el ancho del tablero es siempre el mismo
	 * ¿Por qué no lo setteamos directamente en el constructor?
	 */
	setAnchoTablero() {
		if (this.tipo == "4") {
			return 500;
		}
		if (this.tipo == "5") {
			return 500;
		}
		if (this.tipo == "6") {
			return 500;
		}
		if (this.tipo == "7") {
			return 500;
		}
	}

	/**
	 * Consultar con los chicos:
	 * 
	 * Si el alto del tablero es siempre el mismo
	 * ¿Por qué no lo setteamos directamente en el constructor?
	 */
	setAltoTablero() {
		if (this.tipo == "4") {
			return 400;
		}
		if (this.tipo == "5") {
			return 400;
		}
		if (this.tipo == "6") {
			return 400;
		}
		if (this.tipo == "7") {
			return 400;
		}
	}

	// setDimensionCasillero() {
	// 	switch(this.tipo){
	// 		case "4": return 70;
	// 		case "5": return 60;
	// 		case "6": return 50;
	// 		case "7": return 45;
	// 		default: return 70;	
	// 	}
	// }

	setFilasTablero() {
		switch(this.tipo){
			case "4": return 6;
			case "5": return 7;
			case "6": return 8;
			case "7": return 9;
			default: return 6;	
		}
	}

	setColumnasTablero() {
		switch(this.tipo){
			case "4": return 7;
			case "5": return 8;
			case "6": return 9;
			case "7": return 10;
			default: return 7;	
		}
	}

	getAlto() {
		return this.alto;
	}

	getAncho() {
		return this.ancho;
	}

	dibujar() {
		// Primero dibujamos el background de todo el canvas
		this.background.draw(); 
		// Luego iteramos por cada casillero para que se dibuje
		this.casilleros.forEach(casillero => casillero.dibujar());
	}

	getCoordenadasCentroTablero(){
		return {x: this.posX, y: this.posY};
	}

	crearCasilleros(){
		// Setteamos el borde superior izquierdo del primer casillero
		let posXActual = this.getCoordenadasCentroTablero().x - ((this.columnas / 2) * ((this.ancho / this.columnas)));
		let posYActual = this.getCoordenadasCentroTablero().y - ((this.filas / 2) * ((this.alto / this.filas)));
		
		for (let fila = 0; fila < this.filas; fila++) {
			for (let columna = 0; columna < this.columnas; columna++) {
				// Creamos un casillero
				let casillerocreado = new Casillero(null, (this.ancho / this.columnas), (this.alto / this.filas), this.contexto, posXActual, posYActual);
				// Aumentamos la pos actual en X que usamos como pivote
				posXActual += casillerocreado.getAncho();
				// Agregamos la nueva casilla a la lista de casilleros
				this.casilleros.push(casillerocreado);
			}
			
			// Aumentamos la pos actual en Y que usamos como pivote
			posYActual += casillerocreado.getAlto();
			
			// Cada vez que terminamos una fila debemos volver a settear el X en el borde izquierdo del tablero
			posXActual = this.getCoordenadasCentroTablero().x - ((this.columnas / 2) * ((this.ancho / this.columnas)));
		}
	}

}
