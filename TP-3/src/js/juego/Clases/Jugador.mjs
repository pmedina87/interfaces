

export default class Jugador {
    constructor(nombre, fichas) {
        this.nombre = nombre;
        this.fichas = fichas
    }

    getNombre() {
        return this.nombre;
    }
}