// Variables
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
let carrito = [];
let listaProductos = [];

// Productos archivo JSON
function cargarProductosDesdeJSON() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            listaProductos = data;
            crearTarjetasDeProductos(listaProductos);
        })
        .catch(error => console.error('Error al cargar productos desde JSON:', error));
}

// Función para cargar productos desde el archivo JSON
window.onload = function() {
    console.log("La página se ha cargado correctamente.");
    cargarProductosDesdeJSON();
    cargarCarritoDesdeStorage();
};

// Almacenamiento local (carrito)
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

function agregarAlCarrito(id) {
    const productoExistenteIndex = carrito.findIndex(item => item.id === id);
    if (productoExistenteIndex !== -1) {
        carrito[productoExistenteIndex].cantidad++;
        carrito[productoExistenteIndex].precioTotal = carrito[productoExistenteIndex].cantidad * carrito[productoExistenteIndex].precio;
        lanzarTostada("Agregado!", "top", "left", "3000");
    } else {
        const producto = listaProductos.find(item => item.id === id);
        carrito.push({...producto, cantidad: 1, precioTotal: producto.precio});
        lanzarTostada("Agregado!", "top", "left", "3000");
    }
    mostrarCarrito();
    guardarCarritoEnStorage(); // Guardar el carrito en el almacenamiento local
}

function mostrarCarrito() {
    listaCarrito.innerHTML = `
        <thead>
            <tr>
                <td colspan="6" style="text-align: center;">
                <button onclick="finalizarCompra()" class="finalizar-compra-btn">Finalizar compra</button>
                </td>
            </tr>
        </thead>
        <tbody>
    `;
    let totalCarrito = 0;
    carrito.forEach(({ id, equipo, precio, cantidad, precioTotal, rutaImagen }) => {
        totalCarrito += precioTotal;
        listaCarrito.innerHTML += `
            <tr>
                <td>
                    <img src="./camisetas/${rutaImagen}" alt="${equipo}">
                </td>
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
    guardarCarritoEnStorage();
}

function disminuirCantidad(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad--;
        producto.precioTotal = producto.cantidad * producto.precio;
    } else {
        eliminarProductoDelCarrito(id);
    }
    mostrarCarrito();
    guardarCarritoEnStorage();
}

function eliminarProductoDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id); // Filtramos el carrito para eliminar el producto con el ID dado
    mostrarCarrito(); // Volvemos a mostrar el carrito actualizado
    guardarCarritoEnStorage();
}

// Creando las tarjetas del producto
function crearTarjetasDeProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.innerHTML = `
            <img src="./camisetas/${producto.rutaImagen}" />
            <h3>${producto.categoria} ${producto.equipo}</h3>
            <h4>$ ${producto.precio}</h4>
            <button class="agregar-carrito-btn" onclick="agregarAlCarrito(${producto.id})">AGREGAR</button>
        `;
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Filtrar productos por categoría
document.getElementById("filtros").addEventListener("change", filtrarPorCategoria);

function filtrarPorCategoria() {
    const categoriaSeleccionada = document.getElementById("filtros").value;
    const productosFiltrados = categoriaSeleccionada 
        ? listaProductos.filter(producto => producto.categoria === categoriaSeleccionada)
        : listaProductos;
    crearTarjetasDeProductos(productosFiltrados);
}

// Filtrar productos por nombre
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
    contenidoCarrito.style.display = contenidoCarrito.style.display === "block" ? "none" : "block";
});

// función para crear las tarjetas de productos al cargar la página
window.onload = function() {
    console.log("La página se ha cargado correctamente.");
    cargarProductosDesdeJSON();
};

// Notificacion de agregado al carrito
function lanzarTostada (text, gravity, position,duration) {
    Toastify({
        text,
        gravity,
        position,
        duration,
    }).showToast()
}

// Notificacion para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "El carrito está vacío",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Su compra fue ejecutada con éxito",
            showConfirmButton: false,
            timer: 2000
        });
        carrito = [];
        mostrarCarrito();
        guardarCarritoEnStorage();
    }
}