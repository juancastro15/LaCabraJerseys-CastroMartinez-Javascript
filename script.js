// Mensaje de bienvenida
alert("¡Bienvenido a La Cabra Jerseys!");

// Definir camisetas de fútbol
const camisetas = [
    { equipo: "Real Madrid", precio: 50, stock: 3 },
    { equipo: "Barcelona", precio: 45, stock: 8 },
    { equipo: "Manchester United", precio: 40, stock: 12 },
    { equipo: "Juventus", precio: 55, stock: 6 },
    { equipo: "Bayern Munich", precio: 60, stock: 7 },
    { equipo: "Liverpool", precio: 50, stock: 1 },
    { equipo: "Paris Saint-Germain", precio: 55, stock: 5 },
    { equipo: "Manchester City", precio: 45, stock: 10 }
];

// Objeto carrito de compras
const carrito = {
    camisetas: [],
    total: 0
};

// Función para agregar camiseta al carrito
function agregarAlCarrito(equipo, cantidad) {
    const camisetaEnStock = camisetas.find(item => item.equipo === equipo);

    if (camisetaEnStock && camisetaEnStock.stock >= cantidad) {
        carrito.camisetas.push({ equipo, precio: camisetaEnStock.precio, cantidad });
        camisetaEnStock.stock -= cantidad;
        alert(`¡Camiseta del ${equipo} agregada al carrito!`);
    } else if (camisetaEnStock) {
        alert(`Lo sentimos, la camiseta del ${equipo} no está disponible en la cantidad solicitada.`);
    } else {
        alert(`Lo sentimos, la opción "${equipo}" no está disponible en este momento.`);
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    carrito.total = carrito.camisetas.reduce((total, camiseta) => total + (camiseta.precio * camiseta.cantidad), 0);
}

// Función para procesar el pago
function procesarPago() {
    calcularTotal();
    const confirmacion = confirm(`El total de la compra es $${carrito.total}. ¿Desea proceder con el pago?`);

    if (confirmacion) {
        const nombre = prompt("Ingrese su nombre:");
        const tarjeta = prompt("Ingrese el número de su tarjeta de crédito:");

        if (nombre && tarjeta) {
            alert(`¡Gracias por su compra, ${nombre}! El pago de $${carrito.total} ha sido procesado con éxito.`);
        } else {
            alert("Por favor, complete todos los campos para procesar el pago.");
        }
    } else {
        alert("¡Gracias por visitarnos! Esperamos verte de nuevo pronto.");
    }
}

// Interfaz de usuario
function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        const opcion = prompt(`Seleccione una opción:
        1. Agregar una camiseta al carrito
        2. Proceder al pago
        3. Salir`);

        switch (opcion) {
            case "1":
                const equipo = prompt("Ingrese el equipo que desea:");
                const cantidad = parseInt(prompt("Ingrese la cantidad:"));

                if (equipo && cantidad) {
                    agregarAlCarrito(equipo, cantidad);
                } else {
                    alert("Por favor, ingrese un equipo y una cantidad válida.");
                }
                break;
            case "2":
                procesarPago();
                continuar = false;
                break;
            case "3":
                alert("¡Gracias por visitarnos! Hasta luego.");
                continuar = false;
                break;
            default:
                alert("Por favor, seleccione una opción válida.");
        }
    }
}

// Iniciar el simulador
iniciarSimulador();