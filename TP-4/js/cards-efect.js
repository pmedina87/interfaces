const cards = [];
document.querySelectorAll(".card").forEach(card => cards.push(card));

const observador = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    //indice del contenedor actual del arreglo card, asi se ve cual card es la visible
    //entry.target(me devuelve el obj), indexof el indice de ese obj en arrglo
    const index = cards.indexOf(entry.target);
    
    // Nos arroja 1300px, por lo tanto si window.scrollY es menor a 1400/1500 sabemos que vamos de arriba a abajo
    // console.log(window.scrollY);
    
    //esta visible?
    if (entry.intersectionRatio) {
      // Hacemos visible la card que esta visible al usuario
      cards[index].classList.add("visible");
    }else{
      // Ese if permite que solo se realicen las transiciones si vamos de arriba a abajo.
      // Si vamos de abajo hacia arriba no desapareceran las cards.
      if(window.scrollY < 1400){
        // Hacemos invisible la card que NO esta visible al usuario
        cards[index].classList.remove("visible");
      }
    }
  });
});

//Observa cada imagen x individual (debido a que es responsive...)
cards.forEach(card => observador.observe(card));