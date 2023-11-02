export default class Timer {
	constructor(canvas_context, jugador, tiempo) {
		this.canvas_context = canvas_context;
		this.jugador = jugador;
		this.tiempo = tiempo;
		this.is_pausado = true;
		this.tiempo_transcurrido = 0;
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

	setTiempoTranscurrido(t_tiempo) {
		this.tiempo_transcurrido = t_tiempo;
	}

	getTiempoTranscurrido() {
		return this.tiempo_transcurrido;
	}

	dibujar() {
		setInterval(function () {
            this.tiempo_transcurrido = tiempo;
			this.tiempo_transcurrido--;
		}, 1000);
	}
}