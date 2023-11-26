document.addEventListener("DOMContentLoaded", function () {
  const _wrapper = document.getElementById("contenedor-info-spidermans");
  const sm_blanco = document.getElementById("spiderman-blanco");
  const sm_original = document.getElementById("spiderman-original");
  const sm_negro = document.getElementById("spiderman-negro");
  
  const url_fondo_blanco = "url(./assets/imgs/infoSpidermans/fondo-blanco-spidermans.png)";
  const url_fondo_spiderman_blanco = "url(./assets/imgs/infoSpidermans/fondo-spiderman-blanco.png)";
  const url_fondo_spiderman_original = "url(./assets/imgs/infoSpidermans/fondo-spiderman-original.png)";
  const url_fondo_spiderman_negro = "url(./assets/imgs/infoSpidermans/fondo-spiderman-negro.png)";
  
  const botones_cerrar_descripciones = document.querySelectorAll(".info-spiderman .info-personaje button");

  botones_cerrar_descripciones.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      boton.parentElement.classList.remove("active");
    });

  });

  sm_blanco.addEventListener("click", ()=> botones_cerrar_descripciones.item(0).parentElement.classList.add("active"));
  sm_original.addEventListener("click", ()=> botones_cerrar_descripciones.item(1).parentElement.classList.add("active"));
  sm_negro.addEventListener("click", ()=> botones_cerrar_descripciones.item(2).parentElement.classList.add("active"));
  
  // Creamos un arreglo para poder reutilizar funcionalidades 
  // a traves de las funciones de anbajo 
  const imagenes = [sm_blanco, sm_original, sm_negro];
  
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

  sm_blanco.addEventListener("mouseover", ()=> hoverPersonaje(sm_blanco, url_fondo_spiderman_blanco));
  sm_original.addEventListener("mouseover", ()=> hoverPersonaje(sm_original, url_fondo_spiderman_original));
  sm_negro.addEventListener("mouseover", ()=> hoverPersonaje(sm_negro, url_fondo_spiderman_negro));

  sm_blanco.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_blanco));
  sm_original.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_original));
  sm_negro.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_negro));
});