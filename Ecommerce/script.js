//Definición de los productos como objetos
const productos = [
    { codigo: 1, nombre: 'Zapatos', precio: 19000 },
    { codigo: 2, nombre: 'Bolso', precio: 14000 },
    { codigo: 3, nombre: 'Cinturón', precio: 11000 },
    { codigo: 4, nombre: 'Billetera', precio: 9000 }
];

let total = 0;
const IVA = 0.21;
const DESC_EF = 0.1;
const RECARGO_CREDITO = 0.04;

function buscarProducto(codigo) {
    return productos.find(producto => producto.codigo === codigo);
}

function mostrarProductos() {
    let listaProductos = 'Lista de productos disponibles:\n';
    productos.forEach(producto => {
        listaProductos += `${producto.codigo} - ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(listaProductos);
}

let codProd = parseInt(prompt('Ingrese el código del producto a comprar\n(0 para salir)\n'));
while (codProd !== 0) {
    let producto = buscarProducto(codProd);
    if (producto) {
        total += producto.precio;
        alert(`Agregaste ${producto.nombre} a tu carrito 🛒 Total acumulado: $${total}`);
    } else {
        alert('Código de producto inválido 😕');
    }
    codProd = parseInt(prompt('Ingrese el código del producto a comprar\n(0 para salir)\n'));
}

if (total !== 0) {
    let modoPago = parseInt(prompt('💵 ¿Cómo deseas abonar?\n1 - Efectivo\n2 - Débito\n3 - Crédito'));

    let totalPagar = 0;
    switch (modoPago) {
        case 1:
            totalPagar = aplicarImpuestosyDescuentos(total, IVA, DESC_EF);
            break;
        case 2:
            totalPagar = aplicarImpuestosyDescuentos(total, IVA, 0);
            break;
        case 3:
            totalPagar = aplicarImpuestosyDescuentos(total, IVA + RECARGO_CREDITO, 0);
            break;
        default:
            alert('Opción inválida!');
            break;
    }

    alert(`Total a pagar 💵: $${totalPagar.toFixed(2)}`);
}

function aplicarImpuestosyDescuentos(total, impuestos, descuentos) {
    let totalConImpuestos = total * (1 + impuestos);
    let totalConImpuestosYDescuentos = totalConImpuestos * (1 - descuentos);
    return totalConImpuestosYDescuentos;
}


