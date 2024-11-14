let cart = [];

function addToCart(name, price, image, size = null, color = null) {
    const product = {
        name: name,
        price: price,
        image: image,
        size: size,
        color: color,
        quantity: 1
    };

    
    const existingProductIndex = cart.findIndex(item => 
        item.name === name && item.size === size && item.color === color
    );

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartSummary();
    showNotification(`${name} added to cart.`); 
    
}

function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = '';

    if (cart.length === 0) {
        cartSummary.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    const list = document.createElement('ul');
    let total = 0;

    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}" width="50">
            ${product.name} (${product.size}, ${product.color}) - $${product.price} x ${product.quantity}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        list.appendChild(listItem);
        total += product.price * product.quantity;
    });

    const totalItem = document.createElement('li');
    totalItem.innerHTML = `Total: $${total}`;
    list.appendChild(totalItem);

    cartSummary.appendChild(list);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartSummary();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        return;
    }

    
    alert('Thank you for your support.Proceeding to checkout...');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message; 

    
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
}
function scrollToOrderSummary() {
    var orderSummary = document.getElementById('order-summary');
    if (orderSummary) {
        orderSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}