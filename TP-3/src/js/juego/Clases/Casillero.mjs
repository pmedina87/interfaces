export default class Casillero {
	constructor(imagen, ancho, alto, contexto, posX, posY) {
		this.imagen = imagen;
		this.ancho = ancho;
		this.alto = alto;
		this.contexto = contexto;
		this.posX = posX;
		this.posY = posY;
	}

	getAncho() {
		return this.ancho;
	}

	getAlto() {
        return this.alto;
    }

	dibujar() {
		this.contexto.fillStyle = "#FFAABB";
		this.contexto.fillRect(this.posX, this.posY, this.ancho, this.alto);
        this.contexto.strokeStyle = "black";
        this.contexto.strokeRect(this.posX, this.posY, this.ancho, this.alto);
        // this.contexto.drawImage(this.imagen, this.posX, this.posY);
	}
}