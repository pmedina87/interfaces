document.addEventListener("DOMContentLoaded", function () {
  // obtenemos los titulos y sus respectivos textos
  let tituloA = document.querySelector("#tituloA");
  let tituloB = document.querySelector("#tituloB");
  let tituloC = document.querySelector("#tituloC");
  let tituloD = document.querySelector("#tituloD");

    let arrTitulos = [tituloA, tituloB, tituloC, tituloD];

  let textoA = document.querySelector("#textoA");
  let textoB = document.querySelector("#textoB");
  let textoC = document.querySelector("#textoC");
  let textoD = document.querySelector("#textoD");

  let arrTextos = [textoA, textoB, textoC, textoD];
    // obtenemos las imagenes que tenemos que ir cambiando
  let imgA = document.querySelector("#imgA");
  let imgB = document.querySelector("#imgB");
  let imgC = document.querySelector("#imgC");
  let imgD = document.querySelector("#imgD");

    let arrImg = [imgA, imgB, imgC, imgD];

  const observador = new IntersectionObserver((entries) => {
    //itera x cada entrada, por cada texto
    entries.forEach((entry) => {
      //esta visible?
      if (entry.isIntersecting) {
        //indice del texto actual del arreglo texts, asi se ve cual texto es el visible
        //entry.target(me devuelve el obj), indexof el indice de ese obj en arrglo

        const index = arrTextos.indexOf(entry.target);

        //Ajustamos la opacidad de todas las imágenes a 0, para q solo este visible la q yo quiero
        arrImg.forEach((img) => (img.style.opacity = 0));
        //ajusta titulos
        arrTextos.forEach((title) => (title.style.opacity = 0));

        arrTitulos.forEach((title) => (title.style.opacity = 0));

        //segun la pos en el arreglo sera la imagen y texto q quiero ver
        switch (index) {
          case 0:  
            imgA.style.opacity = 1;
            textoA.style.opacity = 1;
            tituloA.style.opacity = 1;
            textoB.style.opacity = 0;
            tituloB.style.opacity = 0;
            break;
          case 1: 
            imgB.style.opacity = 1;
            textoA.style.opacity = 0;
            tituloA.style.opacity = 0;
            textoB.style.opacity = 1;
            tituloB.style.opacity = 1;
            break;
          case 2: 
            imgC.style.opacity = 1;
            textoC.style.opacity = 1;
            tituloC.style.opacity = 1;
            textoB.style.opacity = 0;
            tituloB.style.opacity = 0;
            break;
          case 3: 
            imgD.style.opacity = 1;
            tituloD.style.opacity = 1;
            textoC.style.opacity = 0;
            tituloC.style.opacity = 0;
            textoD.style.opacity = 1;
            break;
          default:
            break;
        }
      }
    });
  });

  //Observa cada texto individual, que este en el arreglo
  arrTextos.forEach((text) => {
    observador.observe(text);
  });

  function estilos(tipo) {
    let imagen =  "img" + tipo;
    let texto =  "texto" + tipo;
    let titulo =  "titulo" + tipo;
    
    imagen.style.opacity = 1;
    texto.style.opacity = 1;
    titulo.style.opacity = 1;
  };
});