const products = [
    {
        id: 1,
        name: "Laptop ",
        price: 199.99,
        description: "Si desea una buena herramienta esta es la indicada",
        image: "images/laptop.webp"
    },
    {
        id: 2,
        name: "Mouse Logitech G502 Hero",
        price: 56.99,
        description: "Mejore su  trabajo con nuestro mouse de muy buena calidad",
        image: "images/Logitech.webp"
    },
    {
        id: 3,
        name: "Teclado Logitech Pro X",
        price: 69.99,
        description: "Producto importante para la eficiencia,no dude en comprarlo",
        image: "images/teclado.webp"
    },
    {
        id: 4,
        name: "Auriculares HyperX Cloud II",
        price: 99.99,
        description: "Inmersión total en tus partidas o trabajos diarios",
        image: "images/Auriculares HyperX Cloud II.webp",
        category: "audio"
    },
    {
        id: 5,
        name: "Silla Gamer DXRacer",
        price: 149.99,
        description: "Comodidad extrema para largas sesiones de juego o trabajo",
        image: "images/Silla Gamer DXRacer.webp",
        category: "ergonomia"
    },
    {
        id: 6,
        name: "Monitor Curvo 27'' 144Hz",
        price: 299.99,
        description: "Experiencia visual avanzada para gamers y profesionales",
        image: "images/Monitor Curvo 27'' 144Hz.webp",
        category: "monitores"
    },
    {
        id: 7,
        name: "Tarjeta Gráfica RTX 4080",
        price: 899.99,
        description: "Potencia gráfica para juegos ultra HD",
        image: "images/Tarjeta Gráfica RTX 4080.webp",
        category: "componentes"
    }
];

// Estado del carrito
let cart = [];

// Elementos del DOM
const productList = document.getElementById('productList');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');

// Cargar productos en la página
function loadProducts() {
    // Bucle for para iterar sobre los productos (para pruebas de caja blanca)
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        // Crear elemento de producto
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
            </div>
        `;
        
        productList.appendChild(productElement);
    }
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Función para añadir producto al carrito
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    
    // Condicional para encontrar el producto (para pruebas de caja blanca)
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado');
        return;
    }
    
    // Condicional para ver si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    // Calcular total
    let total = 0;
    
    // Bucle for para calcular el total (para pruebas de caja blanca)
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    
    // Actualizar UI
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Limpiar y volver a renderizar ítems del carrito
    cartItems.innerHTML = '';
    
    // Bucle forEach para renderizar ítems (para pruebas de caja blanca)
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
                <button class="remove" data-id="${item.id}">🗑️</button>
            </div>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    // Añadir event listeners a los controles
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => changeQuantity(button, 1));
    });
    
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => changeQuantity(button, -1));
    });
    
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Función para cambiar cantidad de un ítem
function changeQuantity(button, change) {
    const productId = parseInt(button.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Condicional para eliminar si la cantidad es 0 o menos
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        updateCart();
    }
}

// Función para eliminar un ítem
function removeItem(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para finalizar compra
function checkout() {
    // Condicional para carrito vacío
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Simular proceso de compra
    alert(`Compra realizada! Total: $${cartTotal.textContent}` + "Recibirá su producto con la mayor brevedad posible");
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', checkout);

// Inicializar la página
loadProducts();