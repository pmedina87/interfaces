export default class Ficha {
  constructor(canvas_context, x, y, radius, background_color, jugador){
    /**
     * Se guarda la posicion inicial en caso de que se haga 
     * un movimiento invalido y tenga que volver 
     * a su posicion inicial
     */
    this.posicionInicial = {x: x + canvas_context.canvas.offsetLeft, y: y + canvas_context.canvas.offsetTop}; 
    this.posicionActual = {x: x + canvas_context.canvas.offsetLeft, y: y + canvas_context.canvas.offsetTop}; 
    this.canvas_context = canvas_context;
    this.radius = radius;
    this.background_color = background_color;
    this.isClickeada = false;   // Simula el efecto de drag
    this.isPlaced = false;      // Una vez que la ficha esté en el tablero necesitamos avisar que no se puede clickear
    this.isClickeable = true;
    this.jugador = jugador;
  }

  getIsMismoJugador(jugador) {
    return this.jugador === jugador;
  }

  dibujar(){
    this.canvas_context.fillStyle = this.background_color;
    
    if(this.isClickeada){
      this.canvas_context.strokeStyle = "rgb(255, 255, 255)";
    }else{
      this.canvas_context.strokeStyle = "rgb(0, 0, 0)";
    }

    this.canvas_context.beginPath();
    this.canvas_context.arc(this.posicionActual.x, this.posicionActual.y, this.radius, 0, Math.PI * 2);
    this.canvas_context.closePath();
    this.canvas_context.fill();
    this.canvas_context.stroke();
    
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

  setearNuevasCoordenadas(x, y){
    this.posicionActual = {x: x, y: y}
  }

  isClickingInside(event){
    // En caso de que la ficha ya halla sido jugada, automaticamente devuelve false 
    if(this.isPlaced) { return false;}
    
    // √((x2 - x1)² + (y2 - y1)²) < ficha.radius
    let distancia = Math.sqrt(Math.pow(this.posicionActual.x - event.offsetX, 2) + Math.pow(this.posicionActual.y - event.offsetY, 2));
    // Muestra la posicion actual del mouse siendo clickeado
    // console.log("radio: " + item.getRadius() + " | Distancia: " + distancia + " x: " + event.offsetX + " y: " + event.offsetY);
    return (distancia < this.getRadius()); 
  }
}