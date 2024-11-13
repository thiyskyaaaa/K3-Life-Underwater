import products from "./shop_products.js"
import {loadNavbarAndFooter} from "./shop.js";

document.addEventListener("DOMContentLoaded", initialize);

let productDiv;
let quantity = 0;
function initialize(){
    loadNavbarAndFooter();
    loadItems();
    getItem();
}

function loadItems() {
    if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'));
    } else if (localStorage.getItem('selectedProduct')) {
        return JSON.parse(localStorage.getItem('selectedProduct'));
    } else {
        return [];
    }
}


function getItem() {
    const cartItems = loadItems();

    const orderSummary = document.getElementById('oderItems');
    let subtotal = 0;

    cartItems.forEach((cartItem, index) => {
        if (!cartItem.quantity){
            quantity = 1
        }else {
            quantity = cartItem.quantity;
        }
        const product = products.find(product => product.id == cartItem.product_id || cartItem.id);

        if (product) {
            productDiv = document.createElement('div');
            productDiv.classList.add('card');

            productDiv.innerHTML = `
                <div style="width: 80%" class="card-body">
                    <span>Item Name : ${ cartItem.name || product.name}</span>
                    <div>Quantity : ${quantity}</div>
                    <div>Total Price : $${cartItem.price.toFixed(2)}</div>
                </div>
            `;

            orderSummary.appendChild(productDiv);

            subtotal += cartItem.price;

            if (index < cartItems.length - 1) {
                const separator = document.createElement('hr');
                orderSummary.appendChild(separator);
            }
        } else {
            console.error(`Product not found for cart item with ID ${cartItem.product_id}`);
        }
    });

    const subtotalDiv = document.createElement('div');
    subtotalDiv.innerHTML = `<div class="card-header">Subtotal : $${subtotal.toFixed(2)}</div>`;
    orderSummary.appendChild(subtotalDiv);

    const payButtn = document.createElement('div');
    payButtn.classList.add('card');
    payButtn.style.display = "inline-table";

    payButtn.innerHTML = `
        <div style="width: 80%" class="card-body">
            <div class="bttn">
                <button>Make Payment</button>
            </div>
        </div>
    `;
    orderSummary.appendChild(payButtn);

    const clrButtn = document.createElement('div');
    clrButtn.classList.add('card');
    clrButtn.addEventListener('click', function (){orderSummary.innerHTML = ''; localStorage.removeItem('cart'); localStorage.removeItem('selectedProduct')})
    clrButtn.style.display = "inline-table";
    clrButtn.innerHTML = `
        <div style="width: 80%" class="card-body">
            <div class="bttn">
                <button>Clear</button>
            </div>
        </div>
    `;

    orderSummary.appendChild(clrButtn);
}

document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.querySelector('#orderSummary button');

    payButton.addEventListener('click', function() {
        const requiredFields = document.querySelectorAll('#paymentDetails input[required], #paymentDetails select[required], #BillingDetails input[required], #BillingDetails select[required], #contactDetails input[required], #contactDetails select[required]');

        let allFieldsFilled = true;
        requiredFields.forEach(field => {
            if (!field.value) {
                allFieldsFilled = false;
                const label = field.closest('.form-outline').querySelector('label');
                field.classList.add('invalid-field');
            } else {
                field.classList.remove('invalid-field');
            }
        });

        if (allFieldsFilled) {

            makePayment();
        }
    });
});

function makePayment() {

    window.alert("Your Payment is Completely Success..\n\nThank You...!");
    window.location.replace("./shop.html");
    localStorage.removeItem('cart');
    localStorage.removeItem('selectedProduct');
}

