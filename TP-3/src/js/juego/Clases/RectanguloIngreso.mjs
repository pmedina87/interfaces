export default class RectanguloIngreso {
  constructor(canvas_context, x, y, width, height, borderColor, hoverColor){
    this.canvas_context = canvas_context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.borderColor = borderColor;
    this.hoverColor = hoverColor;
    this.isMouseOver = false;
    this.isColumnaLlena = false;
  }

  setColumnaLlena(){
    this.isColumnaLlena = true;
  }

  setIsMouseOverTrue(){
    this.isMouseOver = true;
  }

  setIsMouseOverFalse(){
    this.isMouseOver = false;
  }

  getIsMouseOver(pos_x_actual, pos_y_actual){
    // Verificamos que el x esté entre los posibles puntos de x del objeto
    return (pos_x_actual >= this.x && pos_x_actual < (this.x + this.width))
            // Verificamos que el y esté entre los posible puntos y del objeto 
            && (pos_y_actual >= this.y && pos_y_actual <= (this.y + this.height));
  }

  getHeight(){
    return this.height;
  }
  
  getWidth(){
    return this.width;
  }

  getLimiteXDerecha(){
    return this.x + this.width;
  }

  dibujar(){
    if(this.isColumnaLlena){
      this.canvas_context.fillStyle = "rgb(120, 120, 120)";
      this.canvas_context.beginPath();
      this.canvas_context.rect(this.x, this.y, (this.width), this.height);
      this.canvas_context.fill();
      this.canvas_context.stroke();
      this.canvas_context.closePath();
    }else{
      if(this.isMouseOver){
        this.canvas_context.fillStyle = this.hoverColor;
        this.canvas_context.beginPath();
        this.canvas_context.rect(this.x, this.y, (this.width), this.height);
        this.canvas_context.fill();
        this.canvas_context.stroke();
        this.canvas_context.closePath();
  
      }else{
        this.canvas_context.beginPath();
        this.canvas_context.rect(this.x, this.y, this.width, this.height);
        this.canvas_context.stroke();
      }    
    }
  }
}