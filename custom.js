let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

if (localStorage.getItem('cartItems')) {
    buyThings = JSON.parse(localStorage.getItem('cartItems'));
    countProduct = parseInt(localStorage.getItem('cartCount'));
    totalCard = parseFloat(localStorage.getItem('cartTotal'));
    loadHtml();
}

loadEventListeners();
function loadEventListeners() {
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings = buyThings.filter(product => product.id !== deleteId);
        countProduct--;

        totalCard = calculateTotal();
        saveDataToLocalStorage();

        if (buyThings.length === 0) {
            priceTotal.innerHTML = '0.00';
            amountProduct.innerHTML = '0';
        }

        loadHtml();
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct];
        countProduct++;
    }

    saveDataToLocalStorage();
    loadHtml();
}

function calculateTotal() {
    return buyThings.reduce((total, product) => total + parseFloat(product.price) * product.amount, 0).toFixed(2);
}

function saveDataToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(buyThings));
    localStorage.setItem('cartCount', countProduct);
    localStorage.setItem('cartTotal', totalCard);
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}

const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
    button.addEventListener('click', filterByCategory);
});

function filterByCategory(e) {
    const category = e.target.textContent;
    if (category === 'Mostrar Todo') {
        displayAllCards();
    } else {
        displayFilteredCards(category);
    }
}

function displayAllCards() {
    const allCards = document.querySelectorAll('.carts');
    allCards.forEach(card => {
        card.style.display = 'block';
    });
}

function displayFilteredCards(category) {
    const allCards = document.querySelectorAll('.carts');
    allCards.forEach(card => {
        const cardCategory = card.querySelector('.category').textContent;
        if (cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function showCart(x){
    document.getElementById("products-id").style.display = "block";
}
function closeBtn(){
     document.getElementById("products-id").style.display = "none";
}

const menuButton = document.getElementById("menuButton");
const overlay = document.getElementById("overlay");

menuButton.addEventListener("click", () => {
    overlay.classList.toggle("menu-open");
    document.body.classList.toggle("menu-open");
});

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
    }
});




