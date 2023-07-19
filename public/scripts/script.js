const Usuario = require('./models/Usuarios');


document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario de manera predeterminada

  // Obtener los valores ingresados en los campos de nombre de usuario y contraseña
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Realizar una solicitud HTTP al servidor para verificar las credenciales
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Las credenciales son válidas, redirigir al usuario a la página principal
        console.log('exito');
        window.location.href = '/home'; // Reemplaza "/home" con la ruta correcta de tu página principal
      } else {
        // Las credenciales no son válidas, mostrar un mensaje de error
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = 'Credenciales incorrectas';
      }
    })
    .catch(error => {
      // Manejar el error de la solicitud HTTP
      console.error('Error al verificar las credenciales:', error);
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.innerText = 'Error al verificar las credenciales';
    });
});
