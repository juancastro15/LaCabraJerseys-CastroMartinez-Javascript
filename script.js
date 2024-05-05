// Defino mis camisetas de fútbol
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

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = listaProductos.find(item => item.id === id);
    const nuevoCarrito = [...carrito, producto]; // Creamos una nueva copia del carrito añadiendo el nuevo producto
    carrito = nuevoCarrito; // Actualizamos la referencia del carrito
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(({ equipo }) => { // Desestructuración aquí
        const li = document.createElement("li");
        li.textContent = equipo; // Usamos la propiedad desestructurada directamente
        listaCarrito.appendChild(li);
    });
}

// Creando las tarjetas del producto
function crearTarjetasDeProductos(productos) {
    contenedorProductos.innerHTML = ""; // Limpiamos el contenedor antes de agregar las tarjetas
    productos.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.innerHTML = `
            <img src="./camisetas/${producto.rutaImagen}" />
            <h3>${producto.equipo}</h3>
            <h4>Precio: ${producto.precio}</h4>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
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
    if (contenidoCarrito.style.display === "block") {
        contenidoCarrito.style.display = "none";
    } else {
        contenidoCarrito.style.display = "block";
    }
});

// Llamamos a la función para crear las tarjetas de productos al cargar la página
window.onload = function() {
    console.log("La página se ha cargado correctamente.");
    crearTarjetasDeProductos(listaProductos);
};
