export default class Timer {
	constructor(canvas_context, jugador, tiempo) {
		this.canvas_context = canvas_context;
		this.jugador = jugador;
		this.tiempo = tiempo;
		this.is_pausado = true;
		this.tiempo_restante = this.tiempo;
	}

	getIsMismoJugador(jugador) {
		return this.jugador === jugador;
	}

	getIsPausado() {
		return this.is_pausado;
	}

	setIsPausado() {
		this.is_pausado = !this.is_pausado;
	}

	// setTiempoRestante(t_tiempo) {
	// 	this.tiempo_restante = t_tiempo;
	// }

	getTiempoRestante() {
		return this.tiempo_restante;
	}

	dibujar(color, posX, posY) {
		if (!this.getIsPausado()) {
			// setInterval(function () {                
				this.tiempo_restante--;
			// }, 1000);
		}
		this.canvas_context.font = "30px Arial";
		this.canvas_context.textAlign = "center";
		this.canvas_context.strokeStyle = color;
		this.canvas_context.strokeText(this.tiempo_restante, posX, posY);
	}
}