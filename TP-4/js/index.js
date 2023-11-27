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
          clearInterval(interval);
      } else {
          width++;
          progressBar.style.width = width + "%";
          // Cambia el color de la barra a medida que avanza el progreso
          progressBar.style.backgroundColor = `hsl(${width}, 50%, 50%)`;
      }
  }, 1); // Puedes ajustar la velocidad del progreso aquí
});

const blackSpider = document.getElementById('blackSpider');
const triggerPoint = 1200; // Adjust this value to the desired scroll position in pixels

window.addEventListener('scroll', function() {
  if (window.scrollY >= triggerPoint) {
    blackSpider.style.transition = 'transform 8s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1600ms cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    blackSpider.style.transform = 'translateX(18%)';
    blackSpider.style.opacity = 1;
  }
});