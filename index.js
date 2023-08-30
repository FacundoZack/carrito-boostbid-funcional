let productosArray = []

fetch("productos.json")
    .then(Response => Response.json())
    .then(data => {
        productosArray = data;
        cargarProductos(productosArray)
    });

const contenedorProductos = document.querySelector ("#contenedor-productos");
const numerito = document.querySelector("#numerito")
let botonesAgregar = document.querySelectorAll (".boton");

function cargarProductos() {

    contenedorProductos.innerHTML ="";

    productosArray.forEach(producto => {

        const article = document.createElement("article");
        article.classList.add("producto");
        article.innerHTML = `
            <a href="#">
                <img class="tarjeta__img" src="${producto.imagen}" alt="${producto.titulo}" />
            </a>
            <div class="tarjeta__cuerpo">
                <h3 class="tarjeta__titulo">${producto.titulo}</h3>
                <span class="tarjeta__precio">$${producto.precio}</span>
                <a id="${producto.id}" class="boton" href="#">AGREGAR</a>
            </div>
        `;

        contenedorProductos.append(article);
    });

    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}

cargarProductos();

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll (".boton");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeritos();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito (e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #09667D, #198f9e)",
        },
        onClick: function(){}
    }).showToast();
    

    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        console.log(index);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }   
    actualizarNumeritos();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}   

function actualizarNumeritos() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0) 
    numerito.innerHTML = nuevoNumerito
}