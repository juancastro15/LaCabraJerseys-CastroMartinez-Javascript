// Definimos una función llamada menu
function menu() {
    // Declaración de variables opcion y total
    let opcion;
    let total = 0;

    // Ciclo do-while para mostrar el menú y recibir la selección del usuario
    do {
        // Se muestra el menú al usuario y se obtiene la opción seleccionada
        opcion = Number(prompt(
            "Ingrese opción:\n" +
            "1. Manzana - $10\n" +
            "2. Naranja - $20\n" +
            "3. Banana - $30\n" +
            "0. Salir"
        ));

        // Dependiendo de la opción seleccionada por el usuario, se llama a la función agregarAlCarrito
        if (opcion === 1) {
            total = agregarAlCarrito("manzana", 10, total); // Se pasa el nombre de la fruta, el precio por kilo y el total actual
        } else if (opcion === 2) {
            total = agregarAlCarrito("naranja", 20, total);
        } else if (opcion === 3) {
            total = agregarAlCarrito("banana", 30, total);
        }
    } while (opcion !== 0); // El ciclo se repite mientras la opción ingresada no sea 0 (salir)

    // Una vez que el usuario selecciona salir (opcion = 0), se muestra el total de la compra
    alert("El total de su compra es de $" + total); // Se redondea el total a dos decimales y se muestra en un alert
}

// Definimos una función llamada agregarAlCarrito que recibe el nombre de la fruta, el precio por kilo y el total actual
function agregarAlCarrito(fruta, precioPorKilo, total) {
    // Se pide al usuario que ingrese la cantidad de gramos de la fruta que desea agregar al carrito
    let cantidad = Number(prompt("Ingrese cantidad de gramos"));

    // Se calcula el subtotal multiplicando la cantidad ingresada por el precio por kilo y dividiéndolo por 1000 para convertir a kilos
    let subtotal = precioPorKilo * cantidad / 1000;

    // Se actualiza el total sumando el subtotal al total actual
    total += subtotal;

    // Se muestra un mensaje indicando que se agregó la fruta al carrito y el total del subtotal
    alert("Se agregaron " + cantidad + " gramos de " + fruta + " al carrito por un total de: $" + subtotal);

    // Se muestra el total actual de la compra
    alert("El total hasta el momento es: $" + total);

    // Se retorna el total actualizado
    return total;
}

// Llamamos a la función menu para iniciar el proceso de compra
menu();
