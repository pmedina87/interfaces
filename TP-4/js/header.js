const boton = document.getElementById("btn-hamburguesa");
const raya_centro = document.querySelector("#btn-hamburguesa div");
const elems = [];
const elementos_nav = document.querySelectorAll("#navbar li").forEach(elem => {
  elems.push(elem);
});


boton.addEventListener("click", () => {
  boton.classList.toggle("btn-click");
  
  // Verificamos que los elementos sean mayor a 0
  if(elems.length > 0){
    // Quitamos el primer elemento del arreglo y lo pasamos a la funcion 
    toggleClass(elems.shift());
  }
});

// """"Recursividad""""
function toggleClass(elem){
  // Creamos una promesa
  let a = new Promise((resolve, reject) => {
    // Luego de 300ms agregara/quitará la clase
    setTimeout(() => {
      elem.classList.toggle("showElement");
      // Damos como terminada la promesa
      resolve();
    }, 300);
  });
 
  // Una vez la promesa este resuelta ejecutamos lo siguiente 
  a.then(() => {
    // Verificamos nuevamente que el arreglo de elementos tenga elementos
    if(elems.length > 0 ){
      // Volvemos a llamar a la funcion con el primer elemento del arreglo
      toggleClass(elems.shift());
    }
  });
}