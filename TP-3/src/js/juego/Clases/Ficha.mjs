
//linea invetada para hacer el push
export default class Ficha {
  constructor(canvas_context, x, y, radius, fondo_imagen, contorno_ficha, jugador){
    /**
     * Se guarda la posicion inicial en caso de que se haga 
     * un movimiento invalido y tenga que volver 
     * a su posicion inicial
     */
    this.posicionInicial = { x: x, y: y }; 
    this.posicionActual = this.posicionInicial; 
    this.canvas_context = canvas_context;
    this.radius = radius;
    this.contorno_ficha = contorno_ficha;
    this.imagen = new Image(); // Asigna la ruta de la imagen al objeto Image
		this.imagen.src = fondo_imagen; // Asigna la ruta de la imagen al objeto Image
		this.imagen.onload = () => this.dibujar();
    this.isClickeada = false;   // Simula el efecto de drag
    this.isPlaced = false;      // Una vez que la ficha esté en el tablero necesitamos avisar que no se puede clickear
    this.isClickeable = true;
    this.jugador = jugador;
    this.isGanadora = false;
  }

  setNoClickeable(){
    this.isClickeable = false;
  }

  setearComoGanadora(){
    this.isGanadora = true;
  }

  getIsGanadora(){
    return this.isGanadora;
  }

  getIsClickeable(){
    return this.isClickeable;
  }

  perteneceA(jugador) {
    return this.jugador === jugador;
  }

  getJugador(){
    return this.jugador;
  }

  dibujar(){
    if(this.isClickeada){
      this.canvas_context.strokeStyle = "rgb(22, 231, 4)";
    }else{
      this.canvas_context.strokeStyle = this.contorno_ficha;
    }
    
    // Primero creamos el circulo donde pondremos la imagen
    this.canvas_context.beginPath();
    this.canvas_context.arc(this.posicionActual.x, this.posicionActual.y, this.radius, 0, Math.PI * 2);
    this.canvas_context.closePath();
    // Luego guardamos el estado actual del contexto del canvas
    this.canvas_context.save();
    // Realizamos un clip, al hacer esto, todo lo que esté fuera del circulo que acabamos de dibujar será borrado
    this.canvas_context.clip()
    /**
     * Dibujamos la imagen de ancho y alto del diametro de la ficha,
     * la imagen en si queda cuadrada, pero al haber utilizado la propiedad clip 
     * parecerá que la imagen es un circulo
     */
    this.canvas_context.drawImage(this.imagen, this.posicionActual.x - this.radius, this.posicionActual.y - this.radius, this.radius * 2, this.radius * 2);
    // Por ultimo, volvemos al estado que guardamos con el save(), restaurando el resto del canvas que fue omitido con el clip()
    this.canvas_context.restore();

    // Dibujamos otro circulo (contorno) de ayuda visual para cuando una ficha es clickeada/arrastrada
    this.canvas_context.beginPath();
    this.canvas_context.arc(this.posicionActual.x, this.posicionActual.y, this.radius, 0, Math.PI * 2);
    this.canvas_context.stroke();
    this.canvas_context.closePath();

    if(this.isGanadora){
      this.canvas_context.strokeStyle = "rgb(200, 200, 0)";
      this.canvas_context.lineWidth = 4;
      this.canvas_context.beginPath();
      this.canvas_context.arc(this.posicionActual.x, this.posicionActual.y, this.radius, 0, Math.PI * 2);
      this.canvas_context.stroke();
      this.canvas_context.closePath();
      this.canvas_context.lineWidth = 1;
    }
    
  }

  setearPlaced(){
    this.isPlaced = true;
  }

  setearClickeada(){
    this.isClickeada = true;
  }

  setearDesclickeada(){
    this.isClickeada = false;
  }

  getRadius(){
    return this.radius;
  }

  getClickeada(){
    return this.isClickeada;
  }

  volverPosicionInicial(){
    this.posicionActual = this.posicionInicial;
  }
  setearNuevasCoordenadas(x, y){
    this.posicionActual = {x: x, y: y}
  }

  isClickingInside(event){
    // En caso de que la ficha ya halla sido jugada, automaticamente devuelve false 
    if(this.isPlaced) { return false;}
    if(!this.isClickeable) { return false;}
    
    // √((x2 - x1)² + (y2 - y1)²) < ficha.radius
    let distancia = Math.sqrt(Math.pow(this.posicionActual.x - event.offsetX, 2) + Math.pow(this.posicionActual.y - event.offsetY, 2));
    // Muestra la posicion actual del mouse siendo clickeado
    // console.log("radio: " + item.getRadius() + " | Distancia: " + distancia + " x: " + event.offsetX + " y: " + event.offsetY);
    return (distancia < this.getRadius()); 
  }
}