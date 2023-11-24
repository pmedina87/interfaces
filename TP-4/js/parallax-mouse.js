document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById("wrapper-paralax-mouse");
  const images = document.querySelectorAll("#wrapper-paralax-mouse img");
  
  wrapper.addEventListener("mousemove", (e) =>{
    let centro_x = 1080 / 2;
    let centro_y = 530 / 2;
    let mouse_x = e.offsetX;
    let mouse_y = e.offsetY;
    
    let desplazamiento_cielo = `${50 - (e.clientX - centro_x) * 0.01}% ${50 - (e.clientY - centro_y) * 0.01}%`;
    let desplazamiento_edificios = `${50 - (e.clientX - centro_x) * 0.01}% ${50 - (e.clientY - centro_y) * 0.01}%`;
    let desplazamiento_personajes = [`${-(mouse_x - centro_x) * 0.01}%`, `${-(mouse_y - centro_y) * 0.01}%`];
    
    let x = `${desplazamiento_cielo}, ${desplazamiento_edificios}`;
    
    // No nos toma que al hacer hover nos mueva las imagenes del fondo.
    wrapper.style.backgroundPosition = x;
    
    images.item(0).style.transform = `translate(${desplazamiento_personajes[0]}, ${desplazamiento_personajes[1]})`;
    images.item(1).style.transform = `translate(${desplazamiento_personajes[0]}, ${desplazamiento_personajes[1]})`;
    images.item(2).style.transform = `translate(${desplazamiento_personajes[0]}, ${desplazamiento_personajes[1]})`;
  });
});