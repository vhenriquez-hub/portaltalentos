// Función para validar el formulario (estilo estudiante)
function validarFormulario(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener los valores de las cajas de texto usando var como nos enseñaron
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;

    // Validar si algún campo está vacío
    if (nombre == "" || apellido == "" || email == "" || telefono == "") {
        alert("Porfavor completa el formulario");
        return false;
    }

    // Validar si el email tiene una arroba (usando indexof)
    if (email.indexOf("@") == -1) {
        alert("Correo electrónico inválido !");
        return false;
    }

    // Si no entró a ningun if, todo está bien
    alert("Los datos están correctos y se enviaron.");

    // Limpiamos todo el formulario al final
    document.querySelector('form').reset();

    return true;
}

// Cuando la página cargue, asociamos la función al botón enviar
window.onload = function () {
    var elFormulario = document.querySelector('form');
    // Le decimos que cuando haga submit, llame a nuestra funcion
    if (elFormulario) {
        elFormulario.addEventListener('submit', validarFormulario);
    }
}
