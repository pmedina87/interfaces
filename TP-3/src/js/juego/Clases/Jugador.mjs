import Ficha from "./Ficha.mjs";

export default class Jugador {
    constructor(nombre, cant_fichas, num_jugador, canvas_context, x) {
        this.nombre = nombre;
        this.num_jugador = num_jugador;
        this.cant_fichas = cant_fichas;
        this.canvas_context = canvas_context;
        this.arr_fichas = [];
        this.crearFichas();
    }

    crearFichas(){
        for(let i=0;i<this.cant_fichas;i++){
            let color = "blue";
            let posXInicioFicha = null;
            let posYInicioFicha = null;
            
            if(this.num_jugador == 1){
                posXInicioFicha = 850 + Math.round(Math.random()*150);
                posYInicioFicha = 0 + Math.round(Math.random()*200);
            }else{
                posXInicioFicha = 0 + Math.round(Math.random()*150);
                posYInicioFicha = 0 + Math.round(Math.random()*200);
                color = "red"
            }
            
            console.log("x: " + posXInicioFicha + " | y: " + posYInicioFicha);
            this.arr_fichas.push(new Ficha(this.canvas_context, posXInicioFicha, posYInicioFicha , 20, color));
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