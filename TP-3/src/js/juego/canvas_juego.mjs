import  Rectangle  from "./entidades/Rectangle.mjs";
import Ficha from "./entidades/Ficha.mjs";
import Tablero from "./entidades/Tablero.mjs";

const canvas = document.getElementById("canvas_juego");
const canvas_context = canvas.getContext('2d');

const background = new Rectangle(canvas_context, canvas.width, canvas.height, "rgb(130, 20, 60)");
const tablero = new Tablero(canvas_context, 5, 10);
let clickeadaActualmente = null;
const items = [];

for (let a=0 ; a<21 ; a++){
  let posXInicioFicha =700+ Math.round(Math.random()*150);
  let posYInicioFicha =30+ Math.round(Math.random()*400);
       
  items.push(new Ficha(canvas_context, posXInicioFicha, posYInicioFicha , 20, "blue"));
}

// const ficha = new Ficha(canvas_context, 30, 30, 20, "rgb(100, 10, 10)");


let botonIzquierdoClickeado = false;

function detectarClick(event){
  botonIzquierdoClickeado = true;
  // console.log("Mouse Down!" + botonIzquierdoClickeado);

  // Recorremos cada ficha
  for(let i = items.length-1;i >= 0;i--){
    // se clickea el boton del mouse y ademas se está dentro de la ficha actual 
    if(botonIzquierdoClickeado && isClickingInside(items[i], event)){
      items[i].setearClickeada();
      items[i].setearNuevasCoordenadas(event.offsetX, event.offsetY);
      clickeadaActualmente = items[i];
      return;
    }
 
  }
}

function deseleccionarFichas(){
  botonIzquierdoClickeado = false;
  clickeadaActualmente = null;
  // console.log("Mouse Up!" + botonIzquierdoClickeado);
  
  // Se desclickean todas las fichas
  items.forEach(item => {
    item.setearDesclickeada();
  });
}

canvas.addEventListener("mousedown", detectarClick);
canvas.addEventListener("mouseup", deseleccionarFichas);
canvas.addEventListener("click", ()=>{
  // console.log("Click");
});

canvas.addEventListener("mouseleave", deseleccionarFichas);
canvas.addEventListener("mousemove", moverFicha);


function moverFicha(event){
  items.forEach(item => {
    // Se verifica si el item fue clickeado y en caso de que sí se le asigna la posicion actual del mouse 
    if(item.getClickeada()){
      item.setearNuevasCoordenadas(event.offsetX, event.offsetY);
    }
  });
}

function isClickingInside(item, event){
  console.log(item);
  // √((x2 - x1)² + (y2 - y1)²) < ficha.radius
  let distancia = Math.sqrt(Math.pow(item.posicionActual.x - event.offsetX, 2) + Math.pow(item.posicionActual.y - event.offsetY, 2));
  // Muestra la posicion actual del mouse siendo clickeado
  // console.log("radio: " + item.getRadius() + " | Distancia: " + distancia + " x: " + event.offsetX + " y: " + event.offsetY);
  return (distancia < item.getRadius()); 
}

function dibujarTodo(){
  background.draw();
  // tablero.draw();
  items.forEach(item => item.draw());
  if(clickeadaActualmente != null){
    clickeadaActualmente.draw();
  }
}

setInterval(dibujarTodo, 10);