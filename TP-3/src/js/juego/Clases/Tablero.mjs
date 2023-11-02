import Rectangle from "./Rectangle.mjs";
import Casillero from "./Casillero.mjs";

export default class Tablero {
	constructor(posX, posY, contexto, tipo) {
		this.posX = posX;
		this.posY = posY;
		this.contexto = contexto;
		this.tipo = tipo;
		this.ancho = this.setAnchoTablero();
		this.alto = this.setAltoTablero();
		this.filas = this.setFilasTablero();
		this.columnas = this.setColumnasTablero();
		this.posXAux = this.posX;
		this.posYAux = this.posY;
		this.dimensionCasillero = this.setDimensionCasillero();
	}
	
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

	setAltoTablero() {
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

	setDimensionCasillero() {
		if (this.tipo == "4") {
			return 70;
		}
		if (this.tipo == "5") {
			return 60;
		}
		if (this.tipo == "6") {
			return 50;
		}
		if (this.tipo == "7") {
			return 45;
		}
	}

	setFilasTablero() {
		if (this.tipo == "4") {
			return 6;
		}
		if (this.tipo == "5") {
			return 7;
		}
		if (this.tipo == "6") {
			return 8;
		}
		if (this.tipo == "7") {
			return 9;
		}
	}

	setColumnasTablero() {
		if (this.tipo == "4") {
			return 7;
		}
		if (this.tipo == "5") {
			return 8;
		}
		if (this.tipo == "6") {
			return 9;
		}
		if (this.tipo == "7") {
			return 10;
		}
	}

	getAlto() {
		return this.alto;
	}

	getAncho() {
		return this.ancho;
	}

	dibujar() {
      const background = new Rectangle(
			this.contexto,
			this.contexto.canvas.width,
			this.contexto.canvas.height,
			"rgb(130, 20, 60)"
		);

		background.draw();
		
		for (let fila = 0; fila < this.filas; fila++) {
			for (let columna = 0; columna < this.columnas; columna++) {
				let casillerocreado = new Casillero(
					null,
					this.dimensionCasillero,
					this.dimensionCasillero,
					this.contexto,
					this.posXAux,
					this.posYAux
				);
				casillerocreado.dibujar();
				this.posXAux = this.posXAux + casillerocreado.getAncho();
				if (columna == this.columnas - 1) {
					this.posYAux += casillerocreado.getAlto();
				}
			}
			this.posXAux = this.posX;
		}
	}
}
