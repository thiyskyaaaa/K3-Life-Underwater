import products from "./shop_products.js";

let cart = [];

const addToShoppingCart = () => {
    let CartList = document.querySelector('.listCart');
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.cartTab .close');
    let body = document.querySelector('body');
    const initCartListeners = () => {
        if (iconCart) {
            iconCart.addEventListener('click', () => {
                body.classList.toggle('activeTabCart');
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                body.classList.toggle('activeTabCart');
            });
        }
    };

    const setProductInCart = (idProduct, quantity, position) => {
        if (quantity > 0) {
            let product = products.find(product => product.id == idProduct);
            let total = product.price * quantity;

            if (position < 0) {
                cart.push({
                    product_id: idProduct,
                    quantity: quantity,
                    price: total,
                });
            } else {
                cart[position].quantity = quantity;
                cart[position].price = total;
            }
        } else {
            cart.splice(position, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
    };


    const refreshCart = () => {
        let totalHTML = document.querySelector('.icon-cart span');
        let subTotal = document.getElementById('subTotal');
        let totalQuantity = 0;

        let totalPrice = 0;
        CartList.innerHTML = "";
        cart.forEach(item => {
            let position = products.findIndex((value) => value.id == item.product_id);
            if (position !== -1) {
                let info = products[position];
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML =
                    `
                    <div>
                        <img src="${info.image}" />
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${info.id}">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${info.id}">+</span>
                    </div>
                `;

                CartList.appendChild(newItem);
                totalQuantity += item.quantity;
                totalPrice += info.price * item.quantity;
            }
        });


        totalHTML.innerText = totalQuantity;
        subTotal.innerHTML = " Sub Total : $" + totalPrice.toFixed(2);


        let clearButton = document.createElement('button');
        clearButton.innerText = 'Clear';
        clearButton.style.width = '100px';
        clearButton.style.height = '40px';
        clearButton.addEventListener('click', () => {
            cart = [];
            localStorage.removeItem('cart');
            localStorage.removeItem('selectedProduct');
            refreshCart();
        });

        CartList.appendChild(clearButton);


    };



    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let position = cart.findIndex((value) => value.product_id == idProduct);
        let quantity = position < 0 ? 0 : cart[position].quantity;

        if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')) {
            quantity++;
            setProductInCart(idProduct, quantity, position);
        } else if (buttonClick.classList.contains('minus')) {
            quantity = Math.max(0, quantity - 1); // Ensure quantity doesn't go below 0
            setProductInCart(idProduct, quantity, position);
        }
    });

    const initApp = () => {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        refreshCart();
    };

    initCartListeners();

    initApp();
};

export default addToShoppingCart;
