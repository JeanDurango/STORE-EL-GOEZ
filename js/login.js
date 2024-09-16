document.addEventListener('DOMContentLoaded', function() {
	const registerButton = document.querySelector('.btn-register');

	registerButton.addEventListener('click', function() {
		window.location.href = 'registro.html'; // Redirige a registro.html
	});

	document.getElementById('loginForm').addEventListener('submit', function(event) {
		event.preventDefault(); // Evita el envío del formulario

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		// Validación simple de correo y contraseña
		if (validateEmail(email) && validatePassword(password)) {
			// Simulación de autenticación exitosa
			const userName = 'jhan@prueba.com'; // Aquí puedes obtener el nombre del usuario desde tu backend

			// Guardar el nombre del usuario en el almacenamiento local
			localStorage.setItem('userName', userName);

			// Redirigir al index.html
			window.location.href = 'index.html';
		} else {
			alert('Correo o contraseña incorrectos');
		}
	});
});

function validateEmail(email) {
	// Expresión regular simple para validar el correo electrónico
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

function validatePassword(password) {
    // Validación de la contraseña (mínimo 8 caracteres, al menos una mayúscula y al menos un número)
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}