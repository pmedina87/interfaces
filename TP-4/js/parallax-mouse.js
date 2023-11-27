/**
 * Archivo js que se encarga de detectar el hover sobre el parallax para mover los 3 personajes levitantes.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Contenedor
  const wrapper = document.getElementById("wrapper-paralax-mouse");
  // Imagenes del parallax
  const images = document.querySelectorAll("#wrapper-paralax-mouse img");
  
  // Cuando se mueva el mouse dentro del contenedor
  wrapper.addEventListener("mousemove", (e) =>{
    // Buscamos el centro
    let centro_x = 1080 / 2;
    let centro_y = 530 / 2;

    // Tomamos la distancia del mouse en relacion al contenedor
    let mouse_x = e.offsetX;
    let mouse_y = e.offsetY;
    
    // ! No sabemos bien el porque, pero no podemos realizar movimiento de las imagenes del background 
    // ! Tales como el cielo, los arboles y el pasto.
    // Esos 3 que comentamos son background images del contenedor
    let desplazamiento_cielo = `${50 - (e.clientX - centro_x) * 0.01}% ${50 - (e.clientY - centro_y) * 0.01}%`;
    let desplazamiento_edificios = `${50 - (e.clientX - centro_x) * 0.01}% ${50 - (e.clientY - centro_y) * 0.01}%`;
    // Sigue el movimiento del mouse
    let desplazamiento_pj_izquierda = [`${(mouse_x - centro_x) * 0.006}%`, `${(mouse_y - centro_y) * 0.006}%`];
    // Va en contra del movimiento del mouse
    let desplazamiento_pj_centro = [`${-(mouse_x - centro_x) * 0.007}%`, `${-(mouse_y - centro_y) * 0.007}%`];
    let desplazamiento_pj_derecha = [`${(mouse_x - centro_x) * 0.005}%`, `${(mouse_y - centro_y) * 0.005}%`];
    
    let x = `${desplazamiento_cielo}, ${desplazamiento_edificios}`;
    
    // No nos toma que al hacer hover nos mueva las imagenes del fondo.
    wrapper.style.backgroundPosition = x;
    
    images.item(0).style.transform = `translate(${desplazamiento_pj_izquierda[0]}, ${desplazamiento_pj_izquierda[1]})`;
    // Sigue el movimiento del mouse pero el "y" se mueve en "x" (y visceversa).
    images.item(1).style.transform = `translate(${desplazamiento_pj_derecha[1]}, ${desplazamiento_pj_derecha[0]})`;
    images.item(2).style.transform = `translate(${desplazamiento_pj_centro[0]}, ${desplazamiento_pj_centro[1]})`;
  });
  
  /* Animamos una entrada de los personajes para cuando el container esté a la viste del usuario */
  const personajes = [];
  document.querySelectorAll(".paralax-container img").forEach(personaje => personajes.push(personaje));
  personajes.pop(); // Eliminamos la imagen del pasto 
  // Instanciamos un observador el cual va a verificar si las "entries" aparecen en pantalla.
  const observador = new IntersectionObserver(entries => {
    // Aunque sea 1 solo elemento, las entradas deben ser un arreglo.
    entries.forEach(entry => {
      //esta visible?
      if (entry.intersectionRatio) {
        // Agregar efecto de entrada
        wrapper.classList.add("visible");
        console.log("Es visible");
      }else{
        // Al hacer hover en el wrapper le seteamos style="transform" a cada imagen,
        // Y un estilo directamente setteado en html tiene, en terminos de cascada, mayor importancia.
        // Esto nos impedia realizar la animacion de esconder los personajes cuando el contenedor no estaba visible.
        // 2 horas y era esto...
        personajes.forEach(personaje => personaje.removeAttribute("style"));

        // Rollback al efecto de entrada
        wrapper.classList.remove("visible");
        console.log("NO es visible");
      }
    })
  });

  //Le indicamos al observador que checkee el container
  observador.observe(wrapper);
});
