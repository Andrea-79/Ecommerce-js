// Definición de los productos como objetos
const productos = [
    { codigo: 1, nombre: 'Zapatos', precio: 19000, imagen: 'https://media.istockphoto.com/photos/elegant-black-leather-shoes-picture-id172417586?k=20&m=172417586&s=170667a&w=0&h=UWbFflNWADUK7RI2djsyKprk3jJfhgsjEIRdA5Ld4yk=' },
    { codigo: 2, nombre: 'Bolso', precio: 14000 },
    { codigo: 3, nombre: 'Cinturón', precio: 11000 },
    { codigo: 4, nombre: 'Billetera', precio: 9000 }
];

// Convertir productos a JSON y almacenar en localStorage
const productosJSON = JSON.stringify(productos);
localStorage.setItem('productos', productosJSON);

let carrito = [];

function toggleProductos() {
    const productosContainer = document.getElementById('productos-container');
    const botonMostrar = document.querySelector('.btn-primary');

    if (productosContainer.style.display === 'none') {
        mostrarProductos();
        botonMostrar.textContent = 'Ocultar Productos';
    } else {
        productosContainer.innerHTML = '';
        productosContainer.style.display = 'none';
        botonMostrar.textContent = 'Mostrar Productos';
    }
}

function mostrarProductos() {
    // Recuperar productos desde localStorage y convertir de JSON a objeto
    const productosRecuperadosJSON = localStorage.getItem('productos');
    const productosRecuperados = JSON.parse(productosRecuperadosJSON);

    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = '';

    productosRecuperados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <div class="producto">${producto.nombre} - $${producto.precio}</div>
            <button class="btn btn-success" onclick="agregarAlCarrito(${producto.codigo})">Agregar al carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });

    productosContainer.style.display = 'block';
}

function agregarAlCarrito(codigo) {
    const producto = productos.find(prod => prod.codigo === codigo);
    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoContainer.appendChild(productoDiv);
    });
}

function calcularTotal() {
    let total = 0;

    const modoPago = document.getElementById('modo-pago').value;
    const IVA = 0.21;
    const DESC_EF = 0.1;
    const RECARGO_CREDITO = 0.04;

    carrito.forEach(producto => {
        total += producto.precio;
    });

    switch (modoPago) {
        case 'efectivo':
            total = aplicarImpuestosyDescuentos(total, IVA, DESC_EF);
            break;
        case 'debito':
            total = aplicarImpuestosyDescuentos(total, IVA, 0);
            break;
        case 'credito':
            total = aplicarImpuestosyDescuentos(total, IVA + RECARGO_CREDITO, 0);
            break;
        default:
            alert('Opción inválida!');
            break;
    }

    const totalContainer = document.getElementById('total-container');
    totalContainer.textContent = `Total a pagar 💵: $${total.toFixed(2)}`;
}

function aplicarImpuestosyDescuentos(total, impuestos, descuentos) {
    let totalConImpuestos = total * (1 + impuestos);
    let totalConImpuestosYDescuentos = totalConImpuestos * (1 - descuentos);
    return totalConImpuestosYDescuentos;
}

function limpiarCarrito() {
    carrito = [];
    mostrarCarrito();
}
