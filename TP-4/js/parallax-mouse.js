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
    // Sigue el movimiento del mouse
    let desplazamiento_pj_izquierda = [`${(mouse_x - centro_x) * 0.03}%`, `${(mouse_y - centro_y) * 0.03}%`];
    // Va en contra del movimiento del mouse
    let desplazamiento_pj_centro = [`${-(mouse_x - centro_x) * 0.04}%`, `${-(mouse_y - centro_y) * 0.04}%`];
    let desplazamiento_pj_derecha = [`${(mouse_x - centro_x) * 0.005}%`, `${(mouse_y - centro_y) * 0.005}%`];
    
    let x = `${desplazamiento_cielo}, ${desplazamiento_edificios}`;
    
    // No nos toma que al hacer hover nos mueva las imagenes del fondo.
    wrapper.style.backgroundPosition = x;
    
    images.item(0).style.transform = `translate(${desplazamiento_pj_izquierda[0]}, ${desplazamiento_pj_izquierda[1]})`;
    // Sigue el movimiento del mouse pero en diagonal
    images.item(1).style.transform = `translate(${desplazamiento_pj_derecha[1]}, ${desplazamiento_pj_derecha[0]})`;
    images.item(2).style.transform = `translate(${desplazamiento_pj_centro[0]}, ${desplazamiento_pj_centro[1]})`;
  });
});