import products from "./shop_products.js";
import addToShoppingCart from "./shop_cart.js";


document.addEventListener('DOMContentLoaded', initialize);

function initialize(){
    loadNavbarAndFooter();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!isNaN(productId)) {
        loadProductDetails(productId);
    } else {
        console.log("No product selected!");
    }
}

const loadNavbarAndFooter = () => {
    fetch('common.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const navbarDoc = parser.parseFromString(html, 'text/html');
            document.getElementById('navbar').innerHTML = navbarDoc.querySelector('nav').innerHTML;
            const footerDoc = parser.parseFromString(html, 'text/html');
            document.getElementById('footer').innerHTML = footerDoc.querySelector('footer').innerHTML;
        })
        .catch(error => console.error('Error fetching navbar:', error));
};

function loadProductDetails(productId) {

    const product = products.find(item => item.id === productId);
    localStorage.setItem("selectedProduct", "[" + JSON.stringify(product) + "]");

    if (product) {
        const app = document.getElementById('app');
        const temporaryContent = document.getElementById('temporaryContent');

        const detailHTML = `
            <div class="title">
                PRODUCT DETAIL
            </div>
            <div class="detail">
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                    <div class="buttons">
                        <button onclick="window.location.assign('./shop_checkout.html')" style="color: black">Check Out</button>
                        <button id="addToCartBtn" class="addCart" data-id="${product.id}">
                            Add To Cart
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                            </svg>
                        </button>
                    </div>
                    <div class="description">${product.description}</div>
                    <div class="color-buttons">
                        ${Object.keys(product.image_detail).map(color => `
                           <button class="color-btn" data-color="${color}" onclick="document.querySelectorAll('.image img').forEach(img => img.src = '${product.image_detail[color]}')">${color}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="listProduct"></div>
        `;

        app.innerHTML = detailHTML;
        temporaryContent.innerHTML = '';

        const addToCartButton = document.getElementById('addToCartBtn');
        addToCartButton.addEventListener('click', addToShoppingCart);


        const listProduct = document.querySelector('.listProduct');
        listProduct.innerHTML = '';

    } else {
        console.log("Product not found!");
    }

}

addToShoppingCart();
