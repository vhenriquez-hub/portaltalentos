// ========================================
// VALIDACIONES DEL FORMULARIO CON JQUERY
// Autor: Victor Henriquez
// ========================================

// Función para validar el RUT (la misma de antes)
function validarRut(rut) {
    if (rut == "") {
        return false;
    }

    // Limpiamos los puntos y pasamos a mayúscula
    rut = rut.replace(/\./g, "").toUpperCase();

    // Revisamos que tenga guión
    if (rut.indexOf("-") == -1) {
        return false;
    }

    // Separamos el cuerpo del dígito verificador
    var partes = rut.split("-");
    var cuerpo = partes[0];
    var dvIngresado = partes[1];

    // Algoritmo del módulo 11
    var suma = 0;
    var multiplicador = 2;

    for (var i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + (cuerpo.charAt(i) * multiplicador);
        multiplicador = multiplicador + 1;
        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    var resto = suma % 11;
    var resultado = 11 - resto;
    var dvEsperado = "";

    if (resultado == 11) {
        dvEsperado = "0";
    } else if (resultado == 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = resultado.toString();
    }

    // Comparamos el dígito esperado con el ingresado
    if (dvEsperado == dvIngresado) {
        return true;
    } else {
        return false;
    }
}

// ========================================
// Cuando el documento esté listo, ejecutamos todo
// ========================================
$(document).ready(function () {

    // --- Validación en tiempo real del RUT (cuando sales de la caja) ---
    $("#rut").on("blur", function () {
        var valor = $(this).val();

        if (valor != "") {
            if (validarRut(valor) == false) {
                // Si el RUT es malo, mostramos el error y pintamos rojo
                $("#error-rut").text("El RUT ingresado no es válido").fadeIn();
                $(this).css("border-color", "red");
            } else {
                // Si está bueno, escondemos el error y pintamos verde
                $("#error-rut").fadeOut();
                $(this).css("border-color", "green");
            }
        } else {
            // Si está vacío, quitamos los colores
            $("#error-rut").fadeOut();
            $(this).css("border-color", "");
        }
    });

    // --- Validación del teléfono: solo números ---
    $("#telefono").on("blur", function () {
        var valor = $(this).val();

        if (valor != "") {
            // Revisamos que solo tenga números
            var soloNumeros = /^[0-9]+$/;

            if (soloNumeros.test(valor) == false) {
                $("#error-telefono").text("Solo se permiten números").fadeIn();
                $(this).css("border-color", "red");
            } else {
                $("#error-telefono").fadeOut();
                $(this).css("border-color", "green");
            }
        } else {
            $("#error-telefono").fadeOut();
            $(this).css("border-color", "");
        }
    });

    // --- Validación del email: cuando sales de la caja ---
    $("#email").on("blur", function () {
        var valor = $(this).val();

        if (valor != "") {
            // Revisamos que tenga una arroba
            if (valor.indexOf("@") == -1) {
                $("#error-email").text("El correo debe tener una @").fadeIn();
                $(this).css("border-color", "red");
            } else {
                $("#error-email").fadeOut();
                $(this).css("border-color", "green");
            }
        } else {
            $("#error-email").fadeOut();
            $(this).css("border-color", "");
        }
    });

    // --- Cuando se envía el formulario ---
    $("form").on("submit", function (event) {
        // Evitamos que la página se recargue
        event.preventDefault();

        // Variable para saber si todo está bien
        var todoOk = true;

        // Obtenemos los valores de cada campo con jQuery
        var nombre = $("#nombre").val();
        var rut = $("#rut").val();
        var apellido = $("#apellido").val();
        var email = $("#email").val();
        var telefono = $("#telefono").val();
        var campus = $("#campus").val();
        var cajatexto = $("#cajatexto").val();

        // --- Validar nombre ---
        if (nombre.trim() == "") {
            $("#error-nombre").text("Debes escribir tu nombre").fadeIn();
            $("#nombre").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-nombre").fadeOut();
            $("#nombre").css("border-color", "green");
        }

        // --- Validar RUT ---
        if (rut.trim() == "") {
            $("#error-rut").text("Debes escribir tu RUT").fadeIn();
            $("#rut").css("border-color", "red");
            todoOk = false;
        } else if (validarRut(rut) == false) {
            $("#error-rut").text("El RUT ingresado no es válido").fadeIn();
            $("#rut").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-rut").fadeOut();
            $("#rut").css("border-color", "green");
        }

        // --- Validar apellido ---
        if (apellido.trim() == "") {
            $("#error-apellido").text("Debes escribir tu apellido").fadeIn();
            $("#apellido").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-apellido").fadeOut();
            $("#apellido").css("border-color", "green");
        }

        // --- Validar email ---
        if (email.trim() == "") {
            $("#error-email").text("Debes escribir tu correo").fadeIn();
            $("#email").css("border-color", "red");
            todoOk = false;
        } else if (email.indexOf("@") == -1) {
            $("#error-email").text("El correo debe tener una @").fadeIn();
            $("#email").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-email").fadeOut();
            $("#email").css("border-color", "green");
        }

        // --- Validar teléfono ---
        if (telefono.trim() == "") {
            $("#error-telefono").text("Debes escribir tu teléfono").fadeIn();
            $("#telefono").css("border-color", "red");
            todoOk = false;
        } else {
            var soloNumeros = /^[0-9]+$/;
            if (soloNumeros.test(telefono) == false) {
                $("#error-telefono").text("El teléfono solo puede tener números").fadeIn();
                $("#telefono").css("border-color", "red");
                todoOk = false;
            } else {
                $("#error-telefono").fadeOut();
                $("#telefono").css("border-color", "green");
            }
        }

        // --- Validar campus ---
        if (campus == "Seleccione una Opción") {
            $("#error-campus").text("Debes elegir un campus").fadeIn();
            $("#campus").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-campus").fadeOut();
            $("#campus").css("border-color", "green");
        }

        // --- Validar radio buttons (área de interés) ---
        var radioSeleccionado = $("input[name='inlineRadioOptions']:checked").length;
        if (radioSeleccionado == 0) {
            $("#error-area").text("Debes seleccionar un área de interés").fadeIn();
            todoOk = false;
        } else {
            $("#error-area").fadeOut();
        }

        // --- Validar textarea ---
        if (cajatexto.trim() == "") {
            $("#error-cajatexto").text("Debes escribir algo sobre tus intereses").fadeIn();
            $("#cajatexto").css("border-color", "red");
            todoOk = false;
        } else {
            $("#error-cajatexto").fadeOut();
            $("#cajatexto").css("border-color", "green");
        }

        // --- Si todo está bien, mostramos mensaje de éxito ---
        if (todoOk == true) {
            // Mostramos un mensaje bonito de éxito
            $("#mensaje-exito").slideDown();

            // Limpiamos el formulario
            $("form")[0].reset();

            // Quitamos los bordes verdes de todos los campos
            $(".form-control").css("border-color", "");

            // Después de 3 segundos, escondemos el mensaje de éxito
            setTimeout(function () {
                $("#mensaje-exito").slideUp();
            }, 3000);
        }
    });

    // --- Botón limpiar: también quitamos los errores y bordes ---
    $("button[type='reset']").on("click", function () {
        // Escondemos todos los mensajes de error
        $(".error-msg").fadeOut();

        // Quitamos los bordes de colores
        $(".form-control").css("border-color", "");
    });

});
