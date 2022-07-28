
/* VARIABLES*/
let contenedorCarrito = document.getElementById('carrito-contenedor')
let contenedorProductos = document.getElementById('contenedor-Productos')
let contadorCarrito = document.getElementById('contadorCarrito')
const botonVaciar = document.getElementById('vaciar-carrito')
let botonComprar = document.getElementById('comprar-carrito')


/* ARRAY VACIO CARRITO*/
let carrito = [];

//LLAMO LOS PRODUCTOS DEL .JSON CON FETCH
fetch("productos.json")
    .then(response => response.json())
    .then( lista_productos => rellenarCard(lista_productos));


    function rellenarCard(lista_productos){
    lista_productos.forEach((info) => {

      let div = document.createElement('div');
      div.classList.add('producto')
      div.innerHTML = `
      <img src=${info.img} alt="">
     <h5>${info.nombre}</h5>
      <p>Precio: ${info.precio}</p>
     <button id="agg-producto${info.id}" class="boton-agg"><i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    let boton = document.getElementById(`agg-producto${info.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(info.id)
        Toastify({
            text: "Se agrego al Carrito",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "blue",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    })
});


/* AGG AL CARRITO SIN QUE SE REPITA*/
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = lista_productos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito() 

};

    }
/*VACIAR CARRITO*/
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    localStorage.removeItem('carrito', JSON.stringify(carrito))
});


/* ACTUALIZAR CARRITO*/
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((info) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${info.nombre}</p>
        <p>Precio:$${info.precio}</p>
        <p>Cantidad: <span id="cantidad">${info.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${info.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))


    })
    
    contadorCarrito.innerText = carrito.length

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, info) => acc + info.cantidad * info.precio, 0)
  
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})



/* ELIMINAR DEL CARRITO*/
const eliminarDelCarrito = (infoId) => {
    const item = carrito.find((info) => info.id === infoId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    
    actualizarCarrito()
  
    console.log(carrito)
    Toastify({
        text: "Producto Eliminado",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "grey",
        },
        onClick: function(){} // Callback after click
      }).showToast();
};

/*BOTON COMPRAR*/
botonComprar.addEventListener('click', () => {
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Desea confirmar la compra?',
        text: "Si confirma no podra cancelar la compra!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Compra confirmada',
            'Se realizo la compra!',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Compra cancelada',
            'Cancelo su compra!',
            'error'
          )
        }
      })
    
    });


/* CODIGO DEL MODAL*/
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

});
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
});