
// Inicializa un array vacío para almacenar los productos
let productos = [];

// Realiza una solicitud para obtener los datos de los productos desde un archivo JSON
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data; // Asigna los datos obtenidos al array de productos
        cargarProductos(productos); // Llama a la función para cargar los productos en la página
    })

// Selecciona elementos del DOM necesarios para la funcionalidad
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Añade un evento a cada botón de categoría para ocultar el aside cuando se hace clic
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar los productos en el contenedor
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpia el contenedor de productos

    // Itera sobre los productos elegidos y crea elementos HTML para cada uno
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div); // Añade el producto al contenedor
    })

    actualizarBotonesAgregar(); // Actualiza los eventos de los botones de agregar
}

// Añade eventos cuando el documento está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Añade eventos a los botones de categorías para filtrar productos
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove("active")); // Elimina la clase activa de todos los botones
            e.currentTarget.classList.add("active"); // Añade la clase activa al botón clicado

            if (e.currentTarget.id != "todos") {
                // Filtra los productos por categoría
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                // Muestra todos los productos
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos);
            }
        })
    });
});

// Función para actualizar los eventos de los botones de agregar producto
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


// Inicializa el array de productos en el carrito
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // Obtiene los productos del localStorage si existen
    actualizarNumerito(); // Actualiza el número de productos en el carrito
} else {
    productosEnCarrito = [];
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    // Muestra una notificación cuando se agrega un producto
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Incrementa la cantidad si el producto ya está en el carrito
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Añade el producto al carrito si no está
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito(); // Actualiza el número de productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guarda el carrito en el localStorage
}

// Función para actualizar el número de productos en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito; // Muestra el número de productos en el carrito
}