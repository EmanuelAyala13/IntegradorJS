document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Por favor, completa todos los campos.');
    } else {
        window.location.href = 'index.html';
    }
});
