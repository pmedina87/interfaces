const btn_cart = document.getElementById("btn_carrito");

btn_cart.addEventListener("click", () => {
  btn_cart.nextElementSibling.classList.toggle("carrito-activado");
  console.log("Entro");
});