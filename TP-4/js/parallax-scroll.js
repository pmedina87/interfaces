/**
 * Archivo js el cual se encarga de detectar cuanto se scrolleo en la pagina. 
 * La distancia scrolleada será utilizada para dar efecto a diferentes elemntos de la pagina.
 */

// Tomamos los elementos del parallax del .hero
const edificio_fondo = document.getElementById("edificio-fondo");
const edificio_izquierdo = document.getElementById("edificio-izquierdo");
const edificio_derecho = document.getElementById("edificio-derecho");
const sm_blanco = document.getElementById("hero-spiderman-blanco");
const sm_negro = document.getElementById("hero-spiderman-negro");
const sm_original = document.getElementById("hero-spiderman-original");
const telaraña_derecha = document.getElementById("hero-telaraña-derecha");

// Elemento del header "titulo"
const titulo = document.getElementById("titulo");

// Tomamos el goblin/duende del "punto 6"
const duende = document.getElementById("imagen-duende");

// Cards del "punto 11"
const cards_flotantes = document.querySelectorAll(".contenedor-screenshots-flotantes img");

// Por alguna razon no reconocia el scrollTop del body, 
// asi que lo aplicamos directamente en el document
document.onscroll = () => { 
  // Tomamos cuanto se escrolleo
  let y = window.scrollY;
  
  if(y == 0){
    // En caso de el scroll sea nulo, se vuelve el titulo al tamaño grande
    titulo.classList.remove("achicar");
  }else if(y > 0){
    // En caso de el scroll NO sea nulo, se achica el titulo
    titulo.classList.add("achicar");
  }

  
  edificio_fondo.style.transform = `translateY(${y * -0.1}px) translateX(${y * -0.3}px) `; 
  edificio_izquierdo.style.left = `${0 - (y * 0.2)}px`; 
  edificio_derecho.style.top = `${0 - (y * 0.15)}px`; 
  sm_blanco.style.bottom = `${0 + (y * 0.11)}px`; 
  sm_negro.style.bottom = `${20 + (y * 0.12)}px`; 
  
  sm_original.style.scale = 1 + (y / 1000);

  if(y < 100) {
    
    sm_original.style.transform = `translateY(${20 + y * 0.05}%) translateX(${-80 + y * 0.05}%) `;
  }
  telaraña_derecha.style.bottom = `${10 + (y * 0.12)}px`;
  
  // Cambiamos el top del duende en base cuanto se scrolleo 
  duende.style.top = `${100 + (y * 0.1)}px`;

  // Cambiamos el top de las cards del las cards del "punto 11" para que de un efecto parecido al del duende
  cards_flotantes.forEach(card => card.style.top = `${0 + (y * 0.12)}px`);
}

