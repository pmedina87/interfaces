/**
 * Archivo js que se encarga de realizar el loader de la pagina
 */

document.addEventListener("DOMContentLoaded", function() {
    // Simula un retraso de carga de 2 segundos (puedes cambiar este valor)
  setTimeout(function() {
      // Oculta la barra de carga
      document.querySelector(".loader-container").style.display = "none";
      // Muestra el contenido de la página
      document.getElementById("content").style.display = "block";
  }, 1000); // 2000 milisegundos (2 segundos)

  // Simula el progreso de carga de 0 a 100
  let progressBar = document.getElementById("progress-bar");
  let width = 0;
  let interval = setInterval(function() {
    if (width >= 100) {
        // Termina le ejecucion del setInterval, sino aunque la barra esté en un 100% va a continuar ejecutandose
          clearInterval(interval);
      } else {
          width++;
          // La barra va expandiendose en el eje X
          progressBar.style.width = width + "%";
          // Cambia el color de la barra a medida que avanza el progreso
          progressBar.style.backgroundColor = `hsl(${width}, 50%, 50%)`;
      }
  }, 1); // Puedes ajustar la velocidad del progreso aquí
});