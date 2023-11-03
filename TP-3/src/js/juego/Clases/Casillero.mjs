export default class Casillero {
	constructor(imagen, ancho, alto, canvas_context, posX, posY) {
		this.imagen = imagen;
		this.ancho = ancho;
		this.alto = alto;
		this.canvas_context = canvas_context;
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
		this.canvas_context.fillStyle = "#FFAABB";
		this.canvas_context.fillRect(this.posX, this.posY, this.ancho, this.alto);
        this.canvas_context.strokeStyle = "black";
        this.canvas_context.strokeRect(this.posX, this.posY, this.ancho, this.alto);
		this.canvas_context.stroke();
        // this.contexto.drawImage(this.imagen, this.posX, this.posY);
	}
}