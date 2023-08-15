const productosArray = [
    {
        id: "samsung-tv",
        titulo: "Smart TV samsung",
        imagen: "./img/tv.png",
        precio: 144.999
    },
    {
        id: "mochila-gadnic",
        titulo: "Mochila Gadnic antirobo",
        imagen: "./img/mochila.png",
        precio: 33.649
    },
    {
        id: "aspiradora-robot",
        titulo: "Aspiradora robot Gadnic",
        imagen: "./img/aspiradora-automatica.png",
        precio: 153.899
    },
    {
        id: "proyector-gadnic",
        titulo: "Proyector Gadnic full HD",
        imagen: "./img/proyector.png",
        precio: 53.891
    },
    {
        id: "silla-01",
        titulo: "Silla Game AFA",
        imagen: "./img/sillagamer1.png",
        precio: 199.999
    },
    {
        id: "silla-02",
        titulo: "Silla Constrictor gamer",
        imagen: "./img/sillagamer2.PNG",
        precio: 129.999
    },
    {
        id: "silla-03",
        titulo: "Silla Akracing arctica",
        imagen: "./img/sillagamer3.png",
        precio: 242.379
    },
    {
        id: "silla-04",
        titulo: "Silla gamer rosa RGB con parlantes",
        imagen: "./img/sillagamer4.png",
        precio: 205.321
    }
];

const contenedorProductos = document.querySelector ("#contenedor-productos");
const numerito = document.querySelector("#numerito")
let botonesAgregar = document.querySelectorAll (".boton");

function cargarProductos() {
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