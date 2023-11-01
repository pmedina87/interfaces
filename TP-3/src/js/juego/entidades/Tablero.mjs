export default class Tablero {
  constructor(context, slots_ancho, slots_alto){
    this.context = context;
    this.crearCasilleros(slots_ancho, slots_alto);
  }

  // En la primera fila se guarda la cantidad de fichas x columna,
  // cosa de no recorrer el arreglo.
  crearCasilleros(slots_ancho, slots_alto){
    if(slots_ancho <= 0){ slots_ancho = 6; }
    if(slots_alto <= 0){ slots_alto = 7; }
    
    // Aquí es donde aumentamos en 1 las filas
    slots_alto++;
    this.casilleros = new Array(slots_ancho);
    
    for(let i = 0;i < this.casilleros.length;i++){
      this.casilleros[i] = new Array(slots_alto);
    }
  }

  getDimensiones(){
    return { 
      ancho: this.casilleros.length, 
      alto: this.casilleros[0].length 
    };
  }

  getUltimaPosicionDisponible(columna){
    // Si el id columna no coincide con las dimensiones de la matriz
    if(columna < 0 || columna > (this.casilleros.length - 1)){ return null; }

    // Si la columna se desborda
    if(this.casilleros[columna][0] > (this.casilleros[columna][0] - 1)){ return null; }

    // Devolvemos la fila de la columna donde se puede ingresar la ficha.
    return (this.casilleros[columna][0] - 1);
  }

  agregarFichaAlTablero(ficha, columna){
    let pos = this.getUltimaPosicionDisponible(columna);
    if(pos == null){ return; }

    this.casilleros[columna][pos] = ficha;
    this.casilleros[columna][0] += 1;
  }

}