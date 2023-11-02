import Ficha from "./Ficha.mjs";

export default class Jugador {
    constructor(nombre, cant_fichas, num_jugador, x) {
        this.nombre = nombre;
        this.cant_fichas = cant_fichas;
        this.arr_fichas = [];
        this.crearFichas();
    }

    crearFichas(){
        for(let i=0;i<this.cant_fichas;i++){
            let color = "blue";
            let posXInicioFicha = null;
            let posYInicioFicha = null;
            
            if(num_jugador == 1){
                posXInicioFicha = 700+ Math.round(Math.random()*150);
                posYInicioFicha = 30+ Math.round(Math.random()*400);
            }else{
                posXInicioFicha = 300+ Math.round(Math.random()*150);
                posYInicioFicha = 30+ Math.round(Math.random()*400);
                color = "red"
            }
            
            console.log("x: " + posXInicioFicha + " | y: " + posYInicioFicha);
            this.arr_fichas.push(new Ficha(canvas_context, posXInicioFicha, posYInicioFicha , 20, color));
        }
    }

    dibujarFichas(){
        this.arr_fichas.forEach(ficha => {
            // Se verifica si el ficha fue clickeado y en caso de que sí se le asigna la posicion actual del mouse 
            ficha.draw();
          });        
    }

    getNombre() {
        return this.nombre;
    }
}