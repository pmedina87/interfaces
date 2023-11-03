import Rectangle from "./Rectangle.mjs";
import Casillero from "./Casillero.mjs";
import Jugador from "./Jugador.mjs";
import Ficha from "./Ficha.mjs";
import Timer from "./Timer.mjs";

export default class Tablero {
	
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
			"rgb(224, 230, 230)"
		);
		this.casilleros = [];
		this.crearCasilleros();

		this.timerJug1 = new Timer(this.canvas_context, this.jug1, 300);
		this.timerJug2 = new Timer(this.canvas_context, this.jug2, 300);

		// Variables logica del juego
		this.posicionesIngreso = [];
		this.inicioYControladorFicha = 8; 		// Posicion Y de donde comienza el controlador que agrega fichas al tablero
		this.altoDelControladorFicha = 40;		// Alto del controlador
	
		this.setearArregloEntradaFichas();	
		this.turnoActual = this.setearPrimeroEnJugar();
		
		this.matriz = null;
		this.inicializarMatriz();

	}

	crearTimmer() {
		this.canvas_context.font = "30px Arial";
	}

	crearFichas(){
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

	/**
	 * De ser posible, agrega una ficha al tablero
	 */
	fichaEnControlador(event){
		let inicioXControlador = this.getCoordenadasCentroTablero().x - (this.columnas / 2) * (this.ancho / this.columnas);
		// console.log(`x: ${event.offsetX} | y: ${event.offsetY}`);

		// Verificamos que la ficha esté dentro del rango de Y del controlador
		return ((event.offsetY >= this.inicioYControladorFicha) && (event.offsetY <= (this.inicioYControladorFicha + this.altoDelControladorFicha)) && 
		(event.offsetX >= inicioXControlador) && (event.offsetX <= (inicioXControlador + this.ancho)));
	}

	getIndiceColumna(event){
		console.log(`x: ${event.offsetX} | y: ${event.offsetY}`);
		for(let i = 1;i<(this.posicionesIngreso).length;i++){
			console.log(event.offsetX);
			if(event.offsetX <= this.posicionesIngreso[i]){
				return (i-1);
			}
		}
	}

	devolverFichaPosOriginal(indice_ficha){
		this.fichas[indice_ficha].volverPosicionInicial();
	}

	dibujarReferenciaIngresoFicha() {
		for (let index = 0; index < this.posicionesIngreso.length - 1; index++) {
			this.canvas_context.beginPath();
			this.canvas_context.strokeStyle = "white";
			this.canvas_context.rect(this.posicionesIngreso[index], this.inicioYControladorFicha, this.ancho / this.columnas, this.altoDelControladorFicha);
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
		let posXInicioTablero =
			this.getCoordenadasCentroTablero().x -
			(this.columnas / 2) * (this.ancho / this.columnas);

		for (let index = 0; index <= this.columnas; index++) {
			this.posicionesIngreso.push(posXInicioTablero + (this.ancho / this.columnas) * index);
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
		return this.fichas[indice_ficha].perteneceA(this.turnoActual);
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

	inicializarMatriz(){
		this.matriz = new Array(this.columnas);
		
		for(let i = 0;i<this.matriz.length;i++){
			this.matriz[i] = new Array(this.filas);
		}

		for(let i = 0 ;i<this.matriz.length;i++){
			for(let j = 0 ;j<this.matriz[0].length;j++){
				this.matriz[i][j] = null;
			}	
		}
	}

	/**
	 * Devuelve si una columna tiene espacio para agregar otra ficha
	 * @param indice_columna a verificar
	 * @returns boolean (t/f)
	 */
	isColumnaConEspacio(indice_columna){
		if(indice_columna < 0 || indice_columna > (this.columnas - 1)){
			throw new Error(`Solo se aceptan indices desde el 0 hasta el ${(this.columnas - 1)}`);
		}

		return this.matriz[indice_columna][0] == null;
	}

	/**
	 * Devuelve el indice del array del primer lugar que no tenga ficha (de abajo hacia arriba)
	 * @param indice_columna a verificar
	 * @returns indice del tope
	 */
	primerIndiceDisponibe(indice_columna){
		let columna = this.matriz[indice_columna];
		console.log(columna);
		for(let indice_fila = (columna.length - 1);indice_fila >= 0; indice_fila--){
			if(columna[indice_fila] == null){ 
				return indice_fila 
			}
		}

	}

	/**
	 * Agrega una ficha a la logica del tablero
	 * @param ficha a agregar
	 * @param indice_columna donde se tiene que agregar la ficha
	 */
	agregarFicha(ficha, indice_columna){
		let indice_fila = this.primerIndiceDisponibe(indice_columna);

		this.matriz[indice_columna][indice_fila] = ficha;
		
		if(this.isGanador(indice_columna, indice_fila)){
			// Iluminar las fichas puestas del jugador ganador
		}
	}


	//----------------------------------------------- VERIFICAR VICTORIAS -----------------------------------------------//
	verificarAbajo(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas por debajo sea mayor o igual a la necesaria para ganar
		if((this.matriz[indice_columna].length - indice_fila - 1) < (this.opctablero - 1)){
			console.log("Es imposible ganar para abajo");
			return false;
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna][indice_fila + i];
			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion abajo: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion abajo: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(ficha_actual == null || !ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}
	
	verificarIzquierda(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la izquierda sea mayor o igual a la necesaria para ganar
		if(indice_columna < (this.opctablero - 1)){ 
			console.log("Es imposible ganar para la izquierda");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna - i][indice_fila];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion izq: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion izq: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}
	
	verificarDerecha(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la izquierda sea mayor o igual a la necesaria para ganar
		if(indice_columna + (this.opctablero - 1) > this.columnas){ 
			console.log("Es imposible ganar para la derecha");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna + i][indice_fila];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion der: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion der: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}

	verificarDiagonalSuperiorIzquierda(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la izquierda y hacia arriba sea mayor o igual a la necesaria para ganar
		if((indice_columna < (this.opctablero - 1)) || (indice_fila < (this.opctablero - 1))){ 
			console.log("Es imposible ganar para la diagonal superior izquierda");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna - i][indice_fila - i];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion diagIzqSup: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion diagIzqSup: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}

	verificarDiagonalSuperiorDerecha(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la derecha y hacia arriba sea mayor o igual a la necesaria para ganar
		
		if((indice_columna + (this.opctablero - 1)) > this.columnas || (indice_fila < (this.opctablero - 1))){ 
			console.log("Es imposible ganar para la diagonal superior derecha");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna + i][indice_fila - i];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion diagDerSup: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion diagDerSup: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}

	verificarDiagonalInferiorDerecha(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la derecha y hacia abajo sea mayor o igual a la necesaria para ganar
		if((indice_columna + (this.opctablero - 1)) > this.columnas || ((this.matriz[indice_columna].length - indice_fila - 1) < (this.opctablero - 1))){ 
			console.log("Es imposible ganar para la diagonal inferior derecha");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna + i][indice_fila + i];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion diagDerInf: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion diagDerInf: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}

	verificarDiagonalInferiorIzquierda(indice_columna, indice_fila, jug_actual) {
		// Primero se verifica que la cantidad de fichas a la izquierda y hacia abajo sea mayor o igual a la necesaria para ganar
		if((indice_columna < (this.opctablero - 1)) || ((this.matriz[indice_columna].length - indice_fila - 1) < (this.opctablero - 1))){ 
			console.log("Es imposible ganar para la diagonal inferior izquierda");
			return false; 
		}
		
		let ficha_actual = null;
		
		// Verificamos que a partir de la posicion actual haya (opctablero - 1) fichas pertenecientes al mismo jugador
		for(let i = 1;i<this.opctablero;i++){
			ficha_actual = this.matriz[indice_columna - i][indice_fila + i];
			if(ficha_actual == null) { return false; }

			if(ficha_actual.perteneceA(jug_actual)){
				console.log(`Validacion diagIzqInf: La ficha pertenece al MISMO jugador`);
			}else{
				console.log(`Validacion diagIzqInf: La ficha pertenece al OTRO jugador!`);
			}
			// Si la casilla esta vacia o la ficha presente no pertenece al jugador que acaba de ingresar la ficha tira false
			if(!ficha_actual.perteneceA(jug_actual)){ return false; }
		}

		// Si todo salió bien quiere decir que gano
		return true;
	}

	isGanador(indice_columna, indice_fila) {
		let jug_actual = (this.matriz[indice_columna][indice_fila].perteneceA(this.jug1)) ? this.jug1 : this.jug2;
		
		if(this.verificarAbajo(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		
		if(this.verificarIzquierda(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		
		if(this.verificarDerecha(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		if(this.verificarDiagonalInferiorIzquierda(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		if(this.verificarDiagonalInferiorDerecha(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		if(this.verificarDiagonalSuperiorIzquierda(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}
		if(this.verificarDiagonalSuperiorDerecha(indice_columna, indice_fila, jug_actual)){ 
			console.log(`Ganó el jugador ${jug_actual}!!!`);	
			return true; 
		}

		console.log("No ganó");
		return false;
	}
}

