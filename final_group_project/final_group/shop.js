import cart from "./shop_cart.js";
import products from "./shop_products.js";

const app = document.getElementById('app');
const temporaryContent = document.getElementById('temporaryContent');

const loadTemplate = () => {
    fetch('./shop_template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            const contentTab = document.getElementById('contentTab');
            contentTab.innerHTML = temporaryContent.innerHTML;

            temporaryContent.innerHTML = null;
            cart();
            loadNavbarAndFooter();
            initApp();
        })
        .catch(error => console.error('Error loading template:', error));
};

export const loadNavbarAndFooter = () => {
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

const initApp = () => {
    const listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML = '';
    products.forEach(product => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML =
            `<a href="./shop_details.html?id=${product.id}">
                <img style="width: 150px; height: 160px" src="${product.image}"/>
             </a>
             <h2>${product.name}</h2>
             <div class="price">$${product.price}</div>
             <button class="addCart" data-id="${product.id}">
                 Add To Cart
             </button>`;
        listProduct.appendChild(newProduct);
    });
    localStorage.removeItem('selectedProduct');
};

loadTemplate();
