export default class Ficha {
  constructor(context, x, y, radius, background_color, jugador){
    /**
     * Se guarda la posicion inicial en caso de que se haga 
     * un movimiento invalido y tenga que volver 
     * a su posicion inicial
     */
    this.posicionInicial = {x: x + context.canvas.offsetLeft, y: y + context.canvas.offsetTop}; 
    this.posicionActual = {x: x + context.canvas.offsetLeft, y: y + context.canvas.offsetTop}; 
    this.context = context;
    this.radius = radius;
    this.background_color = background_color;
    this.isClickeada = false;   // Simula el efecto de drag
    this.isPlaced = false;      // Una vez que la ficha esté en el tablero necesitamos avisar que no se puede clickear
    this.jugador = jugador;
  }

  perteneceA(jugador) {
    return this.jugador === jugador;
  }

  getJugador(){
    return this.jugador;
  }

  dibujar(){
    this.context.fillStyle = this.background_color;
    
    if(this.isClickeada){
      this.context.strokeStyle = "rgb(255, 255, 255)";
    }else{
      this.context.strokeStyle = "rgb(0, 0, 0)";
    }

    this.context.beginPath();
    this.context.arc(this.posicionActual.x, this.posicionActual.y, this.radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
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