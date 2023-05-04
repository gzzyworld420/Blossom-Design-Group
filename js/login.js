window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector("form")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")


    // ICONO DE OJO

    // Obtener referencias a los elementos del DOM
    const passwordInput = document.getElementById('inputPassword');
const togglePassword = document.getElementById('togglePassword');

    // Agregar un event listener para el clic en el ícono de "ver contraseña"
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type');
        if (type === 'password') {
            passwordInput.setAttribute('type', 'text');
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            passwordInput.setAttribute('type', 'password');
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });

    // Aquí en este punto yo me encargo de mandar a llamar las funciones de normalizar texto y validaciónes

    inputEmail.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputEmail.name}`, e)) // blur es cuando el usuario hace click fuera del input y se va a otro lado de la página (pierde el foco)
    inputPassword.addEventListener("blur", e => isEmpty(`⚠️ Se requiere que ingrese su ${inputPassword.name}`, e))

    inputEmail.addEventListener("input", validarEmail) // input es cuando el usuario escribe algo en el input
    inputPassword.addEventListener("input", validarContrasenia)
    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparael envío           */
    // /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
        // console.log("Preparando datos");
        const datos = {
            email: normalizarEmail(inputEmail.value),
            password: normalizarTexto(inputPassword.value)
        }
        // console.log(datos);
        realizarLogin(datos)
    })

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(datos) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
        const URL = "https://todo-api.ctd.academy/v1"
        const path = "/users/login"
        const URI = URL + path

        // Fetch a la API
        fetch(URI, config)
            .then(response => {
                // console.log(response);
                return response.json() // yo acá parseo para trabajarlo como un objeto de JS
            })
            .then(resJS => {
                // console.log(resJS);
                // console.log(resJS.jwt);
                if (resJS.jwt) { // si existe ese token
                    localStorage.setItem("jwt", resJS.jwt) // me lo guardo en el bolsillo del LocalStorage
                    location.replace("homePage.html")
                } // caso contrario... error: usuario no existe..
            })
            .catch(err => console.log(err))
    }
});