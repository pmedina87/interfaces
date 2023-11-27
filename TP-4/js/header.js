/**
 * Archivo js el cual se encarga de los eventos por precionar el boton hamburguesa
 */ 

// Le quitamos la posibilidad al usuario de arrastrar imagenes y que salga una copia transparente
document.querySelectorAll("img").forEach(img => img.setAttribute("draggable", false));

// Seleccionamos los elementos
const boton = document.getElementById("btn-hamburguesa");
const elementos_nav = document.querySelectorAll("#navbar li");

// Cuando el usuario clickee el boton hamburguesa
boton.addEventListener("click", () => {
  // Agregamos/quitamos la clase "btn-click" 
  // la cual permite realizar la transicion de las barras del boton hamburguesa 
  boton.classList.toggle("btn-click");
   
  // Por cada elemento agregamos/quitamos la clase "showElement" 
  // que realiza la transicion de mover en el eje x cada item
  elementos_nav.forEach(elemento => elemento.classList.toggle("showElement"));
});

/**
 * Primero optamos por realizar el desplazamiento con promesas 
 * (para que el timing de aparicion de cada opcion sea diferente).
 * 
 * Esta opcion anda, el problema es que como es un llamado asincrono, 
 * si el usuario clickea repetidas veces el boton hamburguesa se genera 
 * una lista de espera, tambien intentamos settear el disable del boton 
 * pero igual se podia seguir buggeando. 
 * 
 * Finalmente nos cayó la ficha de hacer el mismo efecto con css utilizando 
 * transition-delay... 
 */

// const elems1 = [];
// const elems2 = [];
// const elementos_nav = document.querySelectorAll("#navbar li").forEach(elem => {
//   elems1.push(elem);
// });


// boton.addEventListener("click", () => {
//   boton.classList.toggle("btn-click");
//   if(elems1.length > 0){
//     // Hacemos una copia antes de que elems1 quede vacio
//     elems1.map(elem => elems2.push(elem));
//     toggleClass(elems1);
//   }else{
//     // Hacemos una copia antes de que elems2 quede vacio
//     elems2.map(elem => elems1.push(elem));
//     // Revertimos el orden para que el efecto se vea al reves
//     elems2.reverse();
//     toggleClass(elems2);
//   }
// });

// // Recursividad
// function toggleClass(lista){
//   // Verificamos que los elementos sean mayor a 0
//   if(lista.length <= 0){ return ;}

//   // Creamos una promesa
//   let a = new Promise(resolve => {
//     // Luego de 50ms agregara/quitará la clase al elemento actual
//     setTimeout(() => {
//       lista.shift().classList.toggle("showElement");
//       // Damos como terminada la promesa
//       resolve();
//     }, 50);
//   });
  
//   // Una vez la promesa este resuelta ejecutamos lo siguiente 
//   a.then(() => toggleClass(lista));
// }