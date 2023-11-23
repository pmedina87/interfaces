const _wrapper = document.getElementById("contenedor-info-spidermans");
const sm_blanco = document.getElementById("spiderman-blanco");
const sm_original = document.getElementById("spiderman-original");
const sm_negro = document.getElementById("spiderman-negro");

const url_fondo_blanco = "url(./assets/imgs/infoSpidermans/fondo-blanco-spidermans.png)";
const url_fondo_spiderman_blanco = "url(./assets/imgs/infoSpidermans/fondo-spiderman-blanco.png)";
const url_fondo_spiderman_original = "url(./assets/imgs/infoSpidermans/fondo-spiderman-original.png)";
const url_fondo_spiderman_negro = "url(./assets/imgs/infoSpidermans/fondo-spiderman-negro.png)";

// Creamos un arreglo para poder reutilizar funcionalidades 
// a traves de las funciones de anbajo 
const imagenes = [sm_blanco, sm_original, sm_negro];

sm_blanco.addEventListener("mouseover", ()=> hoverPersonaje(sm_blanco, url_fondo_spiderman_blanco));
sm_original.addEventListener("mouseover", ()=> hoverPersonaje(sm_original, url_fondo_spiderman_original));
sm_negro.addEventListener("mouseover", ()=> hoverPersonaje(sm_negro, url_fondo_spiderman_negro));

sm_blanco.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_blanco));
sm_original.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_original));
sm_negro.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_negro));

function hoverPersonaje(personaje_hover, url_fondo){
  _wrapper.style.backgroundImage = [url_fondo, url_fondo_blanco];
  imagenes.forEach(personaje => {
    if(personaje_hover == personaje){
      personaje.classList.remove("blur");
      personaje.classList.add("agrandar");
    }else{
      personaje.classList.remove("agrandar");
      personaje.classList.add("blur");
    }
  });
}

function quitaHoverPersonaje(personajeQuitaHover){
  imagenes.forEach(personaje => {
    if(personajeQuitaHover == personaje){
      personaje.classList.remove("agrandar");
    }else{
      personaje.classList.remove("blur");
    }
  });
  reset();
}

function reset(){
  // La comentada es la que vamos a tener que utilizar cuando creemos la carpeta js
  // _wrapper.style.backgroundImage = "url(./../assets/imgs/infoSpidermans/fondo-blanco-spidermans.png)"
  _wrapper.style.backgroundImage = url_fondo_blanco;
}