export default class Rectangle {
  constructor(context, width, height, background_color){
    this.context = context;
    this.width = width;
    this.height = height;
    this.background_color = background_color;
  }

  draw(){
    this.context.fillStyle = this.background_color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fill();
  }
}