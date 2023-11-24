const edificio_fondo = document.getElementById("edificio-fondo");
const edificio_izquierdo = document.getElementById("edificio-izquierdo");
const edificio_derecho = document.getElementById("edificio-derecho");
const sm_blanco = document.getElementById("hero-spiderman-blanco");
const sm_negro = document.getElementById("hero-spiderman-negro");
const sm_original = document.getElementById("hero-spiderman-original");
const telaraña_derecha = document.getElementById("hero-telaraña-derecha");
const duende = document.getElementById("imagen-duende");
const titulo = document.getElementById("titulo");
const titulo_header = document.getElementById("titulo-header");

// Por alguna razon no reconocia el scrollTop del body, 
// asi que lo aplicamos directamente en el document
document.onscroll = () => { 
  let y = window.scrollY;
  if(y == 0){
    titulo.classList.remove("achicar");
    titulo_header.classList.add("transparente");
    titulo_header.classList.remove("visible");
    titulo.classList.remove("transparente");
  }else if(y > 0){
    
    titulo_header.classList.remove("transparente");
    titulo_header.classList.add("visible");
    titulo.classList.add("achicar");
    titulo.classList.add("transparente");
  }

  edificio_fondo.style.bottom = `${0 - (y * 0.07)}px`; 
  edificio_izquierdo.style.bottom = `${0 - (y * 0.09)}px`; 
  edificio_derecho.style.bottom = `${0 - (y * 0.09)}px`; 
  sm_blanco.style.bottom = `${0 + (y * 0.11)}px`; 
  sm_negro.style.bottom = `${0 + (y * 0.12)}px`; 
  sm_original.style.bottom = `${0 + (y * 0.12)}px`;
  telaraña_derecha.style.bottom = `${0 + (y * 0.12)}px`;
   
  duende.style.top = `${100 + (y * 0.1)}px`;
}

