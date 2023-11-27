/**
 * Archivo js que se encarga de los eventos de los 3 personajes levitantes.
 * Estos personajes al hacerles hover deben agrandarse (el que tiene hover) 
 * y los otros 2 deben quedarse desenfocados (con un blur).
 * 
 * Se cambiará el fondo de la seccion en base al personaje al que le hagamos hover.
 * 
 * Además, al clickear cada personaje obtendremos informacion sobre la identidad del personaje.
 */

document.addEventListener("DOMContentLoaded", function () {
  // El wrapper es el section contenedor
  const _wrapper = document.getElementById("contenedor-info-spidermans");
  // Obtenemos los personajes
  const sm_blanco = document.getElementById("spiderman-blanco");
  const sm_original = document.getElementById("spiderman-original");
  const sm_negro = document.getElementById("spiderman-negro");
  
  // Definimos las urls de las imagenes de fondo
  const url_fondo_blanco = "url(./assets/imgs/infoSpidermans/fondo-blanco-spidermans.png)";
  const url_fondo_spiderman_blanco = "url(./assets/imgs/infoSpidermans/fondo-spiderman-blanco.png)";
  const url_fondo_spiderman_original = "url(./assets/imgs/infoSpidermans/fondo-spiderman-original.png)";
  const url_fondo_spiderman_negro = "url(./assets/imgs/infoSpidermans/fondo-spiderman-negro.png)";
  
  // Seleccionamos los botones "cerrar" de cada div de la identidad secreta de cada personaje
  // Por el orden puesto en el html sabemos que, el 0 es el blanco, el 1 el original y el 2 el negro.  
  const botones_cerrar_descripciones = document.querySelectorAll(".info-spiderman .info-personaje button");

  // Si un boton es clickeado, seleccionaremos el padre contenedor y le removeremo la clase "active".
  // La cual se encarga de agregarle opacidad y de transladar en el eje X el div para que el usuario pueda verlo. 
  botones_cerrar_descripciones.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      boton.parentElement.classList.remove("active");
    });
  });

  // sm = spiderman
  // A cada sm le agregamos un evento en el cual si son clickeados, harán visibles la informacion
  // sobre la identidad del personaje correspondiente.
  sm_blanco.addEventListener("click", ()=> botones_cerrar_descripciones.item(0).parentElement.classList.add("active"));
  sm_original.addEventListener("click", ()=> botones_cerrar_descripciones.item(1).parentElement.classList.add("active"));
  sm_negro.addEventListener("click", ()=> botones_cerrar_descripciones.item(2).parentElement.classList.add("active"));
  
  // Creamos un arreglo para poder reutilizar funcionalidades 
  // a traves de las funciones de abajo 
  const imagenes = [sm_blanco, sm_original, sm_negro];
  
  /**
   * Dado uno de los personajes, iteramos sobre el arreglo de personajes que teniamos y 
   * al objeto pasado le quitamos el scale, y a los otros 2 elementos le quitamos el efecto blur. 
   * @param {} personaje_hover debe ser un htmlDomElement
   * @param {} url_fondo que queramos que el section pase a tener
   */
  function hoverPersonaje(personaje_hover, url_fondo){
    // Asignamos el background del section pra que sea una combinacion, 
    // donde la imagen inferior es la del fondo blanco, y por encima la 
    // imagen pasada por parametro, esto debido a que las 3 imagenes de 
    // cada personaje tienen cortes en la parte superior e inferior, 
    // mas que nada es para que no se vea el fondo negro del body abruptamente. 
    _wrapper.style.backgroundImage = [url_fondo, url_fondo_blanco];
    imagenes.forEach(personaje => {
      if(personaje_hover == personaje){
        personaje.classList.add("agrandar");
      }else{
        personaje.classList.add("blur");
      }
    });
  }
  
  /**
   * Dado uno de los personajes, iteramos sobre el arreglo de personajes que teniamos y 
   * al objeto pasado le quitamos el scale, y a los otros 2 elementos le quitamos el efecto blur.
   * @param {} personajeQuitaHover debe ser un htmlDomElement  
   */
  function quitaHoverPersonaje(personajeQuitaHover){
    imagenes.forEach(personaje => {
      if(personajeQuitaHover == personaje){
        personaje.classList.remove("agrandar");
      }else{
        personaje.classList.remove("blur");
      }
    });

    // Volvemos a dejar el fondo blanco
    _wrapper.style.backgroundImage = url_fondo_blanco;
  }

  // Eventos para cuando hagamos hover sobre cada spiderman
  sm_blanco.addEventListener("mouseover", ()=> hoverPersonaje(sm_blanco, url_fondo_spiderman_blanco));
  sm_original.addEventListener("mouseover", ()=> hoverPersonaje(sm_original, url_fondo_spiderman_original));
  sm_negro.addEventListener("mouseover", ()=> hoverPersonaje(sm_negro, url_fondo_spiderman_negro));

  // Eventos para cuando con el mouse nos salgamos cada spiderman
  sm_blanco.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_blanco));
  sm_original.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_original));
  sm_negro.addEventListener("mouseout", ()=> quitaHoverPersonaje(sm_negro));
});