const boton = document.getElementById("btn-hamburguesa");
const raya_centro = document.querySelector("#btn-hamburguesa div");
const elems1 = [];
const elems2 = [];
const elementos_nav = document.querySelectorAll("#navbar li").forEach(elem => {
  elems1.push(elem);
});


boton.addEventListener("click", () => {
  boton.classList.toggle("btn-click");
  if(elems1.length > 0){
    // Hacemos una copia antes de que elems1 quede vacio
    elems1.map(elem => elems2.push(elem));
    toggleClass(elems1);
  }else{
    // Hacemos una copia antes de que elems2 quede vacio
    elems2.map(elem => elems1.push(elem));
    // Revertimos el orden para que el efecto se vea al reves
    elems2.reverse();
    toggleClass(elems2);
  }
});

// Recursividad
function toggleClass(lista){
  // Verificamos que los elementos sean mayor a 0
  if(lista.length <= 0){ return ;}

  // Creamos una promesa
  let a = new Promise(resolve => {
    // Luego de 50ms agregara/quitará la clase al elemento actual
    setTimeout(() => {
      lista.shift().classList.toggle("showElement");
      // Damos como terminada la promesa
      resolve();
    }, 50);
  });
  
  // Una vez la promesa este resuelta ejecutamos lo siguiente 
  a.then(() => toggleClass(lista));
}