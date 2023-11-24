// Le agrega la propiedad "top: 80px" a la imagen, pero no funciona...

const wrapper = document.getElementById("body");
const duende = document.getElementById("imagen-duende");

wrapper.onscroll = function (){ 
  console.log("entro");
  let y = wrapper.scrollTop;
  duende.style.top = `${(5 * 16) + y * 6}px`; 
}