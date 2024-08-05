

// function chequearMayoria(edad){
//     if(edad >=18){
//         alert("Se le puede vender alcohol");
//         console.log("Se le vende");
//         //Aca va todo el codigo si la persona es >18.   
//         return true;
//     }else{
//         //aca termina el programa por tratarse de un menor.
//         alert("prohibido vender alcohol");
//         return false;
//     }
    
// }


const products = [
    { id: 1, name: "Fernet 750ml", price: 10000, image: "https://dcdn.mitiendanube.com/stores/835/701/products/fernet-branca-aperitivo-1000-ml1-f361be27b92a8c5e0b16661028118789-640-0.webp"},
    { id: 2, name: "Vino Rutini malbec 750ml", price: 8000, image: "https://dcdn.mitiendanube.com/stores/835/701/products/rutini-malbec-vino-750ml1-9c2054abca88eb32e216662920268542-1024-1024.webp"},
    { id: 3, name: "Cerveza Corona 710ml", price: 3500, image: "https://acdn.mitiendanube.com/stores/001/973/129/products/corona-710-ml1-acb75b9168fc9764b816596283191104-1024-1024.webp"},
    { id: 4, name: "Gin Gordon's 700ml", price: 25000, image: "https://dcdn.mitiendanube.com/stores/835/701/products/gordon_s-gin-700-ml1-5bf3107377f9b9217b16660936832933-1024-1024.webp"},
    { id: 5, name: "Baileys licor crema 750ml", price: 28999, image: "https://dcdn.mitiendanube.com/stores/835/701/products/baileys-licor-crema-750-ml1-8b0d50632d65a7d66916661050971095-1024-1024.webp"},
    { id: 6, name: "Skyy vodka 750ml", price: 8000, image: "https://dcdn.mitiendanube.com/stores/835/701/products/skyy-vodka-750-ml1-082804dd1f78b3766516660347232619-1024-1024.webp"},
    { id: 7, name: "Tequila José Cuervo 750ml", price: 49800, image: "https://dcdn.mitiendanube.com/stores/835/701/products/jose-cuervo-dorado-tequila-750-ml1-97a276f92578aee86816661024132178-1024-1024.webp"},
    { id: 8, name: "Ron Havana Club Añejo 750ml", price: 15700, image: "https://dcdn.mitiendanube.com/stores/835/701/products/havana-club-anejo-ron-750-ml1-42f3afe23319d2da0416660967651058-1024-1024.webp"},
    { id: 9, name: "Jaggermeister 700ml", price: 21500, image: "https://houseofspirits.com.ar/cdn/shop/products/large-0.7LBottleFrontInt.copy_840x.png?v=1664979478"}

];

/////////////////////////////////////////ARRAY PARA EL CARRITO////////////////////////////////////////////////////////
// let edad = prompt("Ingrese su edad");
// if (chequearMayoria(edad)){
//     alert("sigue el programa");}
let cart = [];

//////////////////////FUNCION PARA GENERAR LAS CARTAS DE LA PAGINA PRINCIPAL//////////////////////////////////////////
function generateProductHTML(product) {
    return `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `;
}

//////////////FUNCION PARA AGREGAR LAS CARTAS DE LOS PROD. EN LA PAG. PRINCIPAL DOM/////////////////////////////////
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => generateProductHTML(product)).join('');
}

//////////////////////////////FUNCION PARA AGREGAR PRODUCTOS AL CARRITO DE COMPRAS///////////////////////////////////////
function addToCart(productId) {     
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
////////////////////FUNCION PARA CARGAR EL CARRITO DESDE EL ALMACENAMIENTO Y RENDERIZARLO////////////////////////////
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    renderCart();
}
/////////////////FUNCION PARA RENDERIZAR EL CARRITO DE COMPRAS EN LA PAGINA DEL CARRITO DOM///////////////////////////
// Función para renderizar el carrito de compras en la pagina del carrito DOM
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${item.image}" class="card-img" alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.name} - $${item.price} x ${item.quantity}</h5>
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2);
}
//////////////////////////////////FUNCION PARA ELIMINAR UN ITEM DEL CARRITO///////////////////////////////////////////
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}
////////////////EVENT LISTENER PARA CARGAR PRODUCTOS O EL CARRITO CUANDO SE CARGA LA PAGINA///////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        loadProducts();
    } else if (document.querySelector('.cart-items')) {
        loadCart();
    }
});
