// Data Array with freshly updated, reliable product images
const products = [
    { id: 1, title: "Laptops & Computers", price: 799.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PN304FMvtkkGQldL2VbZQhb5MDJTBnLMF2rEfSeEwFkVi7WAK7E10D6i&s=10"},
    { id: 2, title: "Smart Fitness Watches", price: 149.50, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60" },
    { id: 3, title: "Home Refresh & Decor", price: 45.00, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=60" },
    { id: 4, title: "Wireless Audio & Headphones", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
    { id: 5, title: "Gamer Accessories", price: 89.99, image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=500&auto=format&fit=crop&q=60" },
    { id: 6, title: "Comfortable Shoes & Sneakers", price: 65.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');

// Render Items Dynamically
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    if(productsToRender.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #565959; padding: 40px 0;">No matching products found.</p>`;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('box');
        productCard.innerHTML = `
            <div>
                <h2>${product.title}</h2>
                <div class="box-img" style="background-image: url('${product.image}');"></div>
                <div class="box-price">$${product.price.toFixed(2)}</div>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Search Logic Feature
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

// Add items to system store cart
window.addToCart = function(productId) {
    const selectedProduct = products.find(prod => prod.id === productId);
    cart.push(selectedProduct);
    updateCartUI();
    
    // Open the side menu panel automatically upon item selection
    cartSidebar.classList.add('active');
};

// UI Cart Updates
function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartSubtotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <i class="fa-solid fa-trash" style="cursor:pointer; color:#c40000;" onclick="removeFromCart(${index})"></i>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartSubtotal.textContent = `$${total.toFixed(2)}`;
}

// Remove from cart item function
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Open/Close Slider System Drawer 
cartToggle.addEventListener('click', () => cartSidebar.classList.toggle('active'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

// FIX: Make Proceed to Checkout button active
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before checking out.");
    } else {
        alert(`Thank you for your order! Processing payment for ${cartSubtotal.textContent}`);
        cart = [];
        updateCartUI();
        cartSidebar.classList.remove('active');
    }
});

// FIX: Make auxiliary navbar links responsive to clicks/taps
document.querySelectorAll('.border-hover, .panel-ops p, .panel-all, .foot-panel1').forEach(button => {
    button.addEventListener('click', function() {
        const text = this.innerText.trim().replace(/\n/g, " ");
        alert(`You clicked: "${text}"\nThis feature would link to the respective Amazon page.`);
    });
});

// Initialize store page
renderProducts(products);