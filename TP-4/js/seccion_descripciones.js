/**
 * Archivo js el cual se encarga de detectar cuando cada bloque descriptivo de la seccion del "punto 4" 
 * para que cuando el texto de cada fila entre a la vista, se muestre una nueva imagen y se oculte la antes visible. 
 */

document.addEventListener("DOMContentLoaded", function () {
	// Obtenemos las imagenes
	const imagenes = []; 
	document.querySelectorAll(".seccion-descripciones img").forEach(img => imagenes.push(img));

	// Obtenemos los contenedores de cada descripcion
	const descripciones = []; 
	document.querySelectorAll(".seccion-descripciones .descripcion").forEach(desc => descripciones.push(desc));
	
	const observador = new IntersectionObserver(entries => {
		//itera x cada entrada, por cada contenedor de descripcion
		entries.forEach(entry => {
			//esta visible?
			if (entry.intersectionRatio) {
				//indice del contenedor actual del arreglo descripciones, asi se ve cual descripcion es el visible
				//entry.target(me devuelve el obj), indexof el indice de ese obj en arrglo
				const index = descripciones.indexOf(entry.target);

				// Ajustamos la opacidad de todas las imágenes a 0, 
				// para que solo este visible la que nosotros queremos
				imagenes.forEach(img => img.style.opacity = 0);
				
				// Hacemos visible la imagen acorde al parrafo
				imagenes[index].style.opacity = 1;
			}
		});
	});

	//Observa cada parrafo individual, que este en el arreglo
	descripciones.forEach(desc => {
		observador.observe(desc);
	});

	/*
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
				
				arrImg[index].style.opacity = 1;
				arrTextos[index].style.opacity = 1;
				arrTitulos[index].style.opacity = 1;
			}
		});
	});

	//Observa cada texto individual, que este en el arrgelo
	arrTextos.forEach((text) => {
		observador.observe(text);
	});
	*/
});
