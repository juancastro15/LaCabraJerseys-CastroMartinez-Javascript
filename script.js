// Definimos nuestros productos
let listaProductos = [
    {id: 1, equipo: "Real Madrid", precio: 50, stock: 3, rutaImagen: "real-madrid.webp" },
    {id: 2, equipo: "Barcelona", precio: 45, stock: 8, rutaImagen: "barcelona-fc.webp" },
    {id: 3, equipo: "Manchester United", precio: 40, stock: 12, rutaImagen: "man-united.jpeg" },
    {id: 4, equipo: "Juventus", precio: 55, stock: 6, rutaImagen: "juventus.png" },
    {id: 5, equipo: "Bayern Munich", precio: 60, stock: 7, rutaImagen: "bayern.webp" },
    {id: 6, equipo: "Liverpool", precio: 50, stock: 1, rutaImagen: "liverpool.webp" },
    {id: 7, equipo: "Paris Saint-Germain", precio: 55, stock: 5, rutaImagen: "psg.jpeg" },
    {id: 8, equipo: "Manchester City", precio: 45, stock: 10, rutaImagen: "man-city.webp" }
];

// Variables
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
let carrito = [];

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = listaProductos.find(item => item.id === id);
    carrito = producto ? [...carrito, producto] : carrito;
    mostrarCarrito();
}

function agregarAlCarrito(id) {
    const productoExistenteIndex = carrito.findIndex(item => item.id === id); // Buscamos el índice del producto en el carrito
    if (productoExistenteIndex !== -1) {
        // Si el producto ya está en el carrito, actualizamos su cantidad y precio total
        carrito[productoExistenteIndex].cantidad++;
        carrito[productoExistenteIndex].precioTotal = carrito[productoExistenteIndex].cantidad * carrito[productoExistenteIndex].precio;
    } else {
        // Si el producto no está en el carrito, lo agregamos al carrito con una cantidad inicial de 1
        const producto = listaProductos.find(item => item.id === id);
        carrito.push({...producto, cantidad: 1, precioTotal: producto.precio});
    }
    mostrarCarrito(); // Mostramos el carrito actualizado
}

function mostrarCarrito() {
    listaCarrito.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;
    let totalCarrito = 0;
    carrito.forEach(({ id, equipo, precio, cantidad, precioTotal }) => {
        totalCarrito += precioTotal;
        listaCarrito.innerHTML += `
            <tr>
                <td>${equipo}</td>
                <td>$${precio}</td>
                <td>
                    <button onclick="disminuirCantidad(${id})">-</button>
                    ${cantidad}
                    <button onclick="aumentarCantidad(${id})">+</button>
                </td>
                <td>$${precioTotal}</td>
                <td><button onclick="eliminarProductoDelCarrito(${id})">Eliminar</button></td>
            </tr>
        `;
    });
    const totalCarritoElement = document.getElementById("totalCarrito");
    totalCarritoElement.textContent = `Total: $${totalCarrito}`;
}

function aumentarCantidad(id) {
    const producto = carrito.find(item => item.id === id);
    producto.cantidad++;
    producto.precioTotal = producto.cantidad * producto.precio;
    mostrarCarrito();
}

function disminuirCantidad(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad--;
        producto.precioTotal = producto.cantidad * producto.precio;
    } else {
        eliminarProductoDelCarrito(id); // Si la cantidad es 1 o menos, eliminamos el producto del carrito
    }
    mostrarCarrito();
}

function eliminarProductoDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id); // Filtramos el carrito para eliminar el producto con el ID dado
    mostrarCarrito(); // Volvemos a mostrar el carrito actualizado
}


// Creando las tarjetas del producto
function crearTarjetasDeProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.innerHTML = `
            <img src="./camisetas/${producto.rutaImagen}" />
            <h3>${producto.equipo}</h3>
            <h4>$ ${producto.precio}</h4>
            <button class="agregar-carrito-btn" onclick="agregarAlCarrito(${producto.id})">AGREGAR</button>
        `;
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Función para filtrar productos por nombre
function filtrarProductos() {
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    const productosFiltrados = listaProductos.filter(producto => producto.equipo.toLowerCase().includes(textoBusqueda));
    crearTarjetasDeProductos(productosFiltrados);
}

// Escucha el evento 'input' en el campo de búsqueda
document.getElementById("buscador").addEventListener("input", filtrarProductos);

// Variable para el botón de alternar el carrito
const toggleCarritoBtn = document.getElementById("toggleCarrito");

// Variable para el contenido del carrito
const contenidoCarrito = document.getElementById("contenidoCarrito");

// Escuchar clics en el botón de alternar el carrito
toggleCarritoBtn.addEventListener("click", () => {
    // Alternar la visibilidad del contenido del carrito
    contenidoCarrito.style.display = contenidoCarrito.style.display === "block" ? "none" : "block";
});

// Llamamos a la función para crear las tarjetas de productos al cargar la página
window.onload = function() {
    console.log("La página se ha cargado correctamente.");
    crearTarjetasDeProductos(listaProductos);
};
