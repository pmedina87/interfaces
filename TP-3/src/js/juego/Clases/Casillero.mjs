export default class Casillero {
	constructor(url_imagen, ancho, alto, canvas_context, posX, posY) {
		this.imagen = new Image(); // Asigna la ruta de la imagen al objeto Image
		this.imagen.src = url_imagen; // Asigna la ruta de la imagen al objeto Image
		this.imagen.onload = () => this.dibujar();
		this.ancho = ancho;
		this.alto = alto;
		this.canvas_context = canvas_context;
		this.posX = posX;
		this.posY = posY;
		this.imagen.onload = () => {
			this.dibujar();
	};
	}

	getAncho() {
		return this.ancho;
	}

	getAlto() {
        return this.alto;
    }

	dibujar() {
    this.canvas_context.strokeStyle = "black";
		this.canvas_context.drawImage(this.imagen, this.posX, this.posY, this.ancho, this.alto)
    this.canvas_context.stroke();
    // this.contexto.drawImage(this.imagen, this.posX, this.posY);
	}
}