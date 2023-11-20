document.addEventListener("DOMContentLoaded", function() {
  // Simula un retraso de carga de 2 segundos (puedes cambiar este valor)
  setTimeout(function() {
      // Oculta la barra de carga
      document.querySelector(".loader-container").style.display = "none";
      // Muestra el contenido de la página
      document.querySelector(".content").style.display = "block";
  }, 7000); // 2000 milisegundos (2 segundos)

  // Simula el progreso de carga de 0 a 100
  let progressBar = document.getElementById("progress-bar");
  let width = 0;
  let interval = setInterval(function() {
      if (width >= 100) {
          clearInterval(interval);
      } else {
          width++;
          progressBar.style.width = width + "%";
          // Cambia el color de la barra a medida que avanza el progreso
          progressBar.style.backgroundColor = `hsl(${width}, 50%, 50%)`;
      }
  }, 50); // Puedes ajustar la velocidad del progreso aquí
});