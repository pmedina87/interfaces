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

    let arrImg = [imgA, imgB, imgC, img4];

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
						estilos("A");
						break;
					case 1:
                        estilos("B");
						// imgB.style.opacity = 1;
						// textoA.style.opacity = 0;
						// tituloA.style.opacity = 0;
						// textoB.style.opacity = 1;
						// tituloB.style.opacity = 1;
						break;
					case 2:
                        estilos("C");
						// imgC.style.opacity = 1;
						// textoC.style.opacity = 1;
						// title3.style.opacity = 1;
						// text2.style.opacity = 0;
						// title2.style.opacity = 0;
						break;
					case 3:
                        estilos("D");
						// img4.style.opacity = 1;
						// title4.style.opacity = 1;
						// text3.style.opacity = 0;
						// title3.style.opacity = 0;
						// text4.style.opacity = 1;
						break;
					default:
						break;
				}
			}
		});
	});

	//Observa cada texto individual, que este en el arrgelo
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
