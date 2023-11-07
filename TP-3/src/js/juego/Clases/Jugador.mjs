export default class Jugador {
    constructor(nombre, num_jugador, canvas_context) {
        this.nombre = nombre;
        this.num_jugador = num_jugador;
        this.cant_fichas_disponible = 0;
        this.canvas_context = canvas_context;
    }

    getNombre() {
        return this.nombre;
    }

    getNumeroJugador() {
        return this.num_jugador;
    }
}