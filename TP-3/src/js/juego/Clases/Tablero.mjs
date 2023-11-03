import Rectangle from "./Rectangle.mjs";
import Casillero from "./Casillero.mjs";
import Jugador from "./Jugador.mjs";
import Ficha from "./Ficha.mjs";
import Timer from "./Timer.mjs";

export default class Tablero {
	// constructor(contexto, tipo) {
	// 	this.posX = contexto.canvas.getAttribute("width") / 2;
	// 	this.posY = contexto.canvas.getAttribute("height") / 2;
	// 	this.contexto = contexto;
	// 	this.tipo = tipo;
	// 	this.ancho = 500;
	// 	this.alto = 400;
	// 	this.filas = this.setFilasTablero();
	// 	this.columnas = this.setColumnasTablero();

	// 	this.background = new Rectangle(this.contexto, this.contexto.canvas.width, this.contexto.canvas.height, "rgb(130, 20, 60)");
	// 	this.casilleros = [];
	// 	this.crearCasilleros();
	// }

	constructor(canvas_context, opctablero, desafio, jugador1, jugador2) {
		this.canvas_context = canvas_context;
		this.posX = canvas_context.canvas.getAttribute("width") / 2;
		this.posY = canvas_context.canvas.getAttribute("height") / 2;
		this.opctablero = opctablero;
		this.desafio = desafio;
		this.ancho = 500;
		this.alto = 400;
		this.jug1 = new Jugador(jugador1 != "" ? jugador1 : "Jugador 1", 1, this.canvas_context);
		this.jug2 = new Jugador(jugador2 != "" ? jugador2 : "Jugador 2", 2, this.canvas_context);
		this.filas = this.setFilasTablero();
		this.columnas = this.setColumnasTablero();
		this.fichas = [];
		this.crearFichas();
		this.color_fondo = new Rectangle(
			this.canvas_context,
			this.canvas_context.canvas.width,
			this.canvas_context.canvas.height,
			"rgb(130, 20, 60)"
		);
		this.casilleros = [];
		this.crearCasilleros();

		this.timerJug1 = new Timer(this.canvas_context, this.jug1, 100000);
		this.timerJug2 = new Timer(this.canvas_context, this.jug2, 100000);

		// Variables logica del juego
		this.posicionesIngreso = [];
		this.setearArregloEntradaFichas();
		this.turnoActual = this.setearPrimeroEnJugar();
	}

	crearFichas() {
		let cant_fichas = this.filas * this.columnas;
		for (let i = 0; i < cant_fichas; i++) {
			let color = "blue";
			let posXInicioFicha = null;
			let posYInicioFicha = null;

			if (i < cant_fichas / 2) {
				// desde 850 hasta 1000px
				posXInicioFicha = 850 + Math.round(Math.random() * 150);
				posYInicioFicha = 0 + Math.round(Math.random() * 200);
				this.fichas.push(
					new Ficha(
						this.canvas_context,
						posXInicioFicha,
						posYInicioFicha,
						(this.ancho / this.columnas) * 0.4,
						color,
						this.jug2
					)
				);
			} else {
				// Desde 0 hasta 210
				posXInicioFicha = 50 + Math.round(Math.random() * 160);
				posYInicioFicha = 0 + Math.round(Math.random() * 200);
				color = "red";
				this.fichas.push(
					new Ficha(
						this.canvas_context,
						posXInicioFicha,
						posYInicioFicha,
						(this.ancho / this.columnas) * 0.4,
						color,
						this.jug1
					)
				);
			}
		}
	}

	setFilasTablero() {
		switch (this.opctablero) {
			case "4":
				return 6;
			case "5":
				return 7;
			case "6":
				return 8;
			case "7":
				return 9;
			default:
				return 6;
		}
	}

	setColumnasTablero() {
		switch (this.opctablero) {
			case "4":
				return 7;
			case "5":
				return 8;
			case "6":
				return 9;
			case "7":
				return 10;
			default:
				return 7;
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
		this.color_fondo.draw();
		// Luego iteramos por cada casillero para que se dibuje
		this.casilleros.forEach((casillero) => casillero.dibujar());
		this.dibujarReferenciaIngresoFicha();
		this.setearNombresJugadores();
		// Dibujamos las fichas
		this.fichas.forEach((ficha) => ficha.dibujar());
		this.timerJug1.dibujar(
			"red",
			(this.canvas_context.canvas.getAttribute("width") - this.ancho - 280) / 2,
			80
		);
		this.timerJug2.dibujar(
			"blue",
			this.canvas_context.canvas.getAttribute("width") - 280 / 2,
			80
		);
	}

	setearNombresJugadores() {
		this.canvas_context.strokeStyle = "red";
		this.canvas_context.textAlign = "center";
		this.canvas_context.strokeText(
			this.jug1.getNombre(),
			(this.canvas_context.canvas.getAttribute("width") - this.ancho - 280) / 2,
			40
		);
		this.canvas_context.strokeStyle = "blue";
		this.canvas_context.strokeText(
			this.jug2.getNombre(),
			this.canvas_context.canvas.getAttribute("width") - 280 / 2,
			40
		);
	}

	dibujarReferenciaIngresoFicha() {
		for (let index = 0; index < this.posicionesIngreso.length - 1; index++) {
			const posXInicio = this.posicionesIngreso[index];
			const posXFin =
				typeof this.posicionesIngreso[index + 1] !== "undefined"
					? this.posicionesIngreso[index + 1]
					: this.ancho;
			this.canvas_context.beginPath();
			this.canvas_context.strokeStyle = "white";
			this.canvas_context.rect(posXInicio, 8, this.ancho / this.columnas, 40);
			this.canvas_context.stroke();
		}
	}

	getCoordenadasCentroTablero() {
		return { x: this.posX, y: this.posY };
	}

	crearCasilleros() {
		// Setteamos el borde superior izquierdo del primer casillero
		let posXActual =
			this.getCoordenadasCentroTablero().x -
			(this.columnas / 2) * (this.ancho / this.columnas);

		let posYActual =
			this.getCoordenadasCentroTablero().y - (this.filas / 2) * (this.alto / this.filas);
		let casillerocreado = null;

		for (let fila = 0; fila < this.filas; fila++) {
			for (let columna = 0; columna < this.columnas; columna++) {
				// Creamos un casillero
				casillerocreado = new Casillero(
					null,
					this.ancho / this.columnas,
					this.alto / this.filas,
					this.canvas_context,
					posXActual,
					posYActual
				);
				// Aumentamos la pos actual en X que usamos como pivote
				posXActual += casillerocreado.getAncho();
				// Agregamos la nueva casilla a la lista de casilleros
				this.casilleros.push(casillerocreado);
			}

			// Aumentamos la pos actual en Y que usamos como pivote
			posYActual += casillerocreado.getAlto();

			// Cada vez que terminamos una fila debemos volver a settear el X en el borde izquierdo del tablero
			posXActual =
				this.getCoordenadasCentroTablero().x -
				(this.columnas / 2) * (this.ancho / this.columnas);
		}
	}

	mouseDentroDeLaFicha(indice_ficha, event) {
		// Validamos que el indice sea valido
		if (indice_ficha < 0 || indice_ficha > this.fichas.length - 1) {
			return false;
		}
		// Validamos si la ficha no está colocada y si el mouse está dentro de la ficha
		return this.fichas[indice_ficha].isClickingInside(event);
	}

	fichaEstaSiendoClickeada(indice_ficha, event) {
		// Validamos que el indice sea valido
		if (indice_ficha < 0 || indice_ficha > this.fichas.length - 1) {
			return false;
		}
		// Validamos que el estado de la ficha como clickeada
		if (!this.fichas[indice_ficha].getClickeada()) {
			return false;
		}
		// Validamos si la ficha no está colocada y si el mouse está dentro de la ficha
		return this.fichas[indice_ficha].isClickingInside(event);
	}

	setearFichaComoDesclickeada(indice_ficha) {
		if (indice_ficha >= 0 && indice_ficha <= this.fichas.length - 1) {
			this.fichas[indice_ficha].setearDesclickeada();
		}
	}

	setearFichaComoClickeada(indice_ficha) {
		if (indice_ficha >= 0 && indice_ficha <= this.fichas.length - 1) {
			this.fichas[indice_ficha].setearClickeada();
		}
	}

	setearNuevasCoordenadasAFicha(indice_ficha, x, y) {
		if (indice_ficha >= 0 && indice_ficha <= this.fichas.length - 1) {
			this.fichas[indice_ficha].setearNuevasCoordenadas(x, y);
		}
	}

	/////////////////////////////////////// LOGICA JUEGO ////////////////////////////////////////

	setearArregloEntradaFichas() {
		let posXActual =
			this.getCoordenadasCentroTablero().x -
			(this.columnas / 2) * (this.ancho / this.columnas);

		for (let index = 0; index <= this.columnas; index++) {
			this.posicionesIngreso.push(posXActual + (this.ancho / this.columnas) * index);
		}
	}

	setearPrimeroEnJugar() {
		if (Math.random() > 0.5) {
			return this.jug1;
		} else {
			return this.jug2;
		}
	}

	verificarFichaClickeadaEsJugadorTurnoActual(indice_ficha) {
		return this.fichas[indice_ficha].getIsMismoJugador(this.turnoActual);
	}

	iniciarTiempo() {
		if (this.turnoActual.num_jugador == 1) {
			this.timerJug1.setIsPausado();
		} else {
			this.timerJug2.setIsPausado();
		}
	}

	cambiarTurnoJugador() {
		if (this.turnoActual.num_jugador == 1) {
			this.timerJug1.setIsPausado();
			this.timerJug2.setIsPausado();
		} else {
			this.timerJug2.setIsPausado();
			this.timerJug1.setIsPausado();
		}
	}
}
