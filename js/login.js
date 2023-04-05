window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector("form")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparael envío           */
    // /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", (ev) => { 
        ev.preventDefault()
        // console.log("Preparando datos");
        const datos = {
            email: inputEmail.value,
            password: inputPassword.value 
        }
        // console.log(datos);
        realizarLogin( datos )
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
            .then( resJS => {
                // console.log(resJS);
                // console.log(resJS.jwt);
                if (resJS.jwt) { // si existe ese token
                    localStorage.setItem("jwt", resJS.jwt) // me lo guardo en el bolsillo del LocalStorage
                    location.replace("mis-tareas.html")
                } // caso contrario... error: usuario no existe..
            })
            .catch( err => console.log(err))        
    }
});