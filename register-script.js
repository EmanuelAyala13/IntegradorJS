document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
    } else {
        window.location.href = 'index.html';
    }
});
