//FETCH
fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&lang=es&appid=bbf8893c6e8030e157bb633d11a66e17")




//LOGIN
const nombre = document.getElementById("name")
const email = document.getElementById("email")
const dire = document.getElementById("adress")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(dire.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
        localStorage.setItem('nombre', JSON.stringify(nombre.value))
        localStorage.setItem('email', JSON.stringify(email.value))
        localStorage.setItem('direccion', JSON.stringify(dire.value))
        window.open("ecommerce.html", "_self")
    }
})