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
    containerBuyCart.addEventListener('click', handleCart);

    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            filterProductsByCategory(button.textContent.trim());
        });
    });
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('span').textContent,
        id: product.querySelector('.btn-add-cart').getAttribute('data-id'),
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
    }

    countProduct = buyThings.reduce((count, product) => count + product.amount, 0);

    saveDataToLocalStorage();
    loadHtml();

    alert(`¡${infoProduct.title} se ha agregado al carrito!`);
}

function handleCart(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        const confirmDelete = confirm('¿Estás seguro de eliminar este producto del carrito?');
        
        if (confirmDelete) {
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
    } else if (e.target.classList.contains('btn-increase')) {
        const increaseId = e.target.getAttribute('data-id');
        increaseProductAmount(increaseId);
    } else if (e.target.classList.contains('btn-decrease')) {
        const decreaseId = e.target.getAttribute('data-id');
        decreaseProductAmount(decreaseId);
    }
}

function increaseProductAmount(id) {
    const product = buyThings.find(product => product.id === id);
    if (product) {
        product.amount++;
        countProduct++;
        totalCard = calculateTotal();
        saveDataToLocalStorage();
        loadHtml();
    }
}

function decreaseProductAmount(id) {
    const product = buyThings.find(product => product.id === id);
    if (product && product.amount > 1) {
        product.amount--;
        countProduct--;
        totalCard = calculateTotal();
        saveDataToLocalStorage();
        loadHtml();
    }
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
                <div>
                    <button class="btn-increase" data-id="${id}">+</button>
                    <span>${amount}</span>
                    <button class="btn-decrease" data-id="${id}">-</button>
                </div>
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

function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => category === 'Mostrar Todo' ? true : product.category === category);
    allContainerCart.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('carts');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p class="title">${product.title}</p>
            <p><span>${product.price}</span>$</p>
            <a href="#" class="btn-add-cart" data-id="${product.id}">Agregar al carrito</a>
            <p class="category">${product.category}</p>
        `;

        allContainerCart.appendChild(card);
    });
}

// Código de las 9 cartas
const products = [
    {
        image: 'images/products/AmumuNFT.png',
        title: 'AmumuSad',
        price: '19.99',
        category: 'Gaming',
        id: 'product-1'
    },
    {
        image: 'images/products/EminemNFT.png',
        title: 'EM-F-T',
        price: '29.99',
        category: 'Música',
        id: 'product-2'
    },
    {
        image: 'images/products/Messi10.png',
        title: 'Messi 2077',
        price: '9.99',
        category: 'Deporte',
        id: 'product-3'
    },
    {
        image: 'images/products/LeeSinNFT.png',
        title: 'FF 15',
        price: '19.99',
        category: 'Gaming',
        id: 'product-4'
    },
    {
        image: 'images/products/SnoopDoggNFT.png',
        title: 'SnoopDogg',
        price: '29.99',
        category: 'Música',
        id: 'product-5'
    },
    {
        image: 'images/products/MessiCampeon.png',
        title: '18/12/22',
        price: '9.99',
        category: 'Deporte',
        id: 'product-6'
    },
    {
        image: 'images/products/TreshNFT.png',
        title: 'MasterTresh',
        price: '19.99',
        category: 'Gaming',
        id: 'product-7'
    },
    {
        image: 'images/products/TupacNFT.png',
        title: '2-FT',
        price: '29.99',
        category: 'Música',
        id: 'product-8'
    },
    {
        image: 'images/products/MessiGold.png',
        title: 'El Rey',
        price: '9.99',
        category: 'Deporte',
        id: 'product-9'
    }
];

function generateProductCards() {
    const productsContainer = document.querySelector('.products');

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('carts');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p class="title">${product.title}</p>
            <p><span>${product.price}</span>$</p>
            <a href="#" class="btn-add-cart" data-id="${product.id}">Agregar al carrito</a>
            <p class="category">${product.category}</p>
        `;

        productsContainer.appendChild(card);
    });
}

const menuButton = document.getElementById('menuButton');
const overlay = document.getElementById('overlay');

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

generateProductCards();

const suggestionForm = document.getElementById('suggestion-form');

suggestionForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userEmail = document.getElementById('user-email').value;
    const userSuggestion = document.getElementById('user-suggestion').value;

    let suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    suggestions.push({ email: userEmail, suggestion: userSuggestion });
    localStorage.setItem('suggestions', JSON.stringify(suggestions));

    document.getElementById('user-email').value = '';
    document.getElementById('user-suggestion').value = '';

    alert('Sugerencia enviada con éxito');
});
