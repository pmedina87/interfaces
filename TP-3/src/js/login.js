let form_login = document.querySelector("#form-login");
let btnLogin = document.querySelector("#btn-loginForm");
let chk_captcha = document.querySelector("#chk-captcha");
let animacion = document.querySelector(".animacion");
let container_form_login = document.querySelector("#container-form-login");
let registracion_success_login = document.querySelector("#registration-success-login");
let registration_error_login = document.querySelector("#registration-error-login");

form_login.addEventListener("submit", login);
const input_username = document.getElementById("login-usuario");
const input_password = document.getElementById("login-contrasenia");

// Validamos que los 3 inputs tengan valor
input_username.addEventListener("keyup", () => checkInputsHaveData());
input_password.addEventListener("keyup", () => checkInputsHaveData());
chk_captcha.addEventListener("click", () => checkInputsHaveData());

// Verifica que los 3 inputs tengan valor
function checkInputsHaveData(){
	if(input_username.value && input_password.value && chk_captcha.checked){
		btnLogin.disabled = false;
	}else{
		btnLogin.disabled = "disabled";
	}
}

function login(event) {
	event.preventDefault();
	registration_error_login.classList.remove("animacion_error");
	const user = "juegosmania";
	const pass = "123456";
	let formData = new FormData(form_login);

	let usuario = formData.get('usuario');
	let contrasenia = formData.get('contrasenia');

	if(usuario == user && contrasenia == pass) {
		registracion_success_login.classList.remove("hidden");
		container_form_login.classList.add("hidden");

		setTimeout(function () {
			window.location.href = "index.html";
		}, 3000);

	} else {
		container_form_login.classList.add("hidden");
		registration_error_login.classList.remove("hidden");
		registration_error_login.classList.add("animacion_error");
	}
}

btnLogin.addEventListener("click", function () {
    localStorage.setItem('login', 'true');
});