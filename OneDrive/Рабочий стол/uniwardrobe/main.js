const products = [
    {
        name: 'GAP',
        variants: [
                { size: 's', color: 'black', price: 2000, initialQuantity: 5, remainingQuantity: 5 },
                { size: 's', color: 'white', price: 2000, initialQuantity: 5, remainingQuantity: 5 },
                { size: 'm', color: 'black', price: 2100, initialQuantity: 5, remainingQuantity: 5 },
            // Добавьте другие варианты цветов и размеров
        ]
    },
    // Добавьте информацию о других товарах по аналогии
];

let cart = [];

function addToCart() {
    let productName = 'GAP';
    let quantity = parseInt(document.getElementById('quantity').value);
    let selectedSize = document.getElementById('size').value;
    let selectedColor = document.getElementById('color').value;

    let selectedProduct = products.find(product => product.name === productName);

    if (quantity > 0 && validateVariant(selectedProduct, selectedSize, selectedColor, quantity)) {
        let selectedVariant = selectedProduct.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);

        if (selectedVariant) {
            let totalPrice = quantity * selectedVariant.price;
            cart.push({ product: productName, quantity: quantity, size: selectedSize, color: selectedColor, price: selectedVariant.price, totalPrice: totalPrice });
            updateRemainingQuantity(selectedProduct, selectedSize, selectedColor, quantity);
            updateCart();
            updateProductQuantityOnPage();
            resetInputFields(); // Очищаем поля ввода
            updateTotalPrice(); // Обновляем общую сумму в корзине
        }
    } else {
        alert('Недопустимое количество или нехватка товара в наличии!');
    }
}


function resetInputFields() {
    document.getElementById('quantity').value = 1;
    document.getElementById('size').value = 's';
    document.getElementById('color').value = 'black';
}

function validateVariant(product, size, color, quantity) {
    const selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    return selectedVariant && selectedVariant.remainingQuantity >= quantity;
}

function updateRemainingQuantity(product, size, color, quantity) {
    const selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    if (selectedVariant) {
        selectedVariant.remainingQuantity -= quantity;
    }
}

function getProductRemainingQuantity(productName, size, color) {
    const product = products.find(item => item.name === productName);
    const selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    return selectedVariant ? selectedVariant.remainingQuantity : 0;
}


function updateCart() {
    let cartItemsDiv = document.getElementById('cartItems');
    let cartItems = cart.map(item => `<p>${item.product}, Размер: ${item.size}, Количество: ${item.quantity}, Цена: ${item.price} сом, Общая сумма: ${item.totalPrice} сом <button onclick="removeFromCart('${item.product}', '${item.size}', '${item.color}', ${item.quantity})">Удалить</button></p>`);

    cartItemsDiv.innerHTML = cartItems.join('');
    updateRemainingQuantityDisplay();
}

function updateTotalPrice() {
    let total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    document.getElementById('cartTotalPrice').innerText = total;
}

function updateRemainingQuantityDisplay() {
    const remainingQuantityElement = document.getElementById('remainingQuantity');
    const productName = 'GAP';
    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.getElementById('color').value;

    const remainingQuantity = getProductRemainingQuantity(productName, selectedSize, selectedColor);
    remainingQuantityElement.innerText = `Осталось: ${remainingQuantity} шт.`;
}

function removeFromCart(productName, size, color, quantity) {
    let removedItemIndex = cart.findIndex(item => item.product === productName && item.size === size && item.color === color && item.quantity === quantity);

    if (removedItemIndex !== -1) {
        let removedItem = cart.splice(removedItemIndex, 1)[0];
        restoreRemainingQuantity(productName, size, color, quantity);
        updateCart();
        updateProductQuantityOnPage();
        updateTotalPrice(); // Обновляем общую сумму в корзине
    }
}


function restoreRemainingQuantity(productName, size, color, quantity) {
    const selectedProduct = products.find(product => product.name === productName);
    if (selectedProduct) {
        const selectedVariant = selectedProduct.variants.find(variant => variant.size === size && variant.color === color);
        if (selectedVariant) {
            selectedVariant.remainingQuantity += quantity;
        }
    }
}

function updateProductQuantityOnPage() {
    const productName = 'GAP';
    const productQuantityElement = document.getElementById('remainingQuantity');
    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.getElementById('color').value;

    const product = products.find(item => item.name === productName);
    if (product) {
        const selectedVariant = product.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);
        if (selectedVariant) {
            productQuantityElement.innerText = `Осталось: ${selectedVariant.remainingQuantity} шт.`;
        }
    }
}

// Остальной код...

// Обновление текста на нескольких языках
let currentLanguage = 'ru';

const languageTexts = {
    'ru': {
        'checkoutButton': 'Оформить заказ',
        'searchPlaceholder': 'Поиск товаров...',
        'noResultsMessage': 'Таких товаров нету',
        // Добавьте другие тексты по аналогии
    },
    'en': {
        'checkoutButton': 'Checkout',
        'searchPlaceholder': 'Search for products...',
        'noResultsMessage': 'No results found',
        // Добавьте другие тексты по аналогии
    }
};

const changeLanguage = language => {
    currentLanguage = language;
    updateText();
}

const updateText = () => {
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.innerText = languageTexts[currentLanguage]['checkoutButton'];

    const searchInput = document.getElementById('searchInput');
       // Продолжение функции updateText
       searchInput.placeholder = languageTexts[currentLanguage]['searchPlaceholder'];

       // Продолжайте аналогично для других текстовых элементов на странице
   }
   
   // Вызовите функцию обновления текста при загрузке страницы
   updateText();
   
   function checkout() {
       // Ваш код для оформления заказа
   
       // В данном примере, просто выведем в консоль сообщение об успешном оформлении заказа
       console.log('Заказ успешно оформлен!');
   
       // Если у вас есть специфические действия для оформления заказа, добавьте их сюда
       // Например, очистка корзины, перенаправление на страницу подтверждения заказа и т.д.
       window.location.href = 'checkout.html';
   }
   
   const btns = document.querySelectorAll(".icon");
   for (const btn of btns) {
       btn.addEventListener("click", () => {
           btn.parentElement.classList.toggle("open");
       });
   }
   function searchProducts() {
    let searchInput = document.getElementById('searchInput');
    let searchText = searchInput.value.toLowerCase();
    let productList = document.getElementById('productList');
    let noResultsMessage = document.getElementById('noResultsMessage');

    let foundProducts = [];
 // Поиск товаров в разделе "Рекомендации"
 let productItems = document.querySelectorAll('.product-item p:first-child');
 productItems.forEach(item => {
     let productName = item.innerText.toLowerCase();
     if (productName.includes(searchText)) {
         foundProducts.push(item.closest('.product-item'));
     }
 });

 // Продолжайте поиск в других секциях по аналогии

 // Очистка предыдущих результатов
 productList.innerHTML = '';

 // Отображение найденных товаров или сообщения об отсутствии результатов
 if (foundProducts.length > 0) {
     foundProducts.forEach(product => {
         productList.appendChild(product.cloneNode(true));
     });
     noResultsMessage.style.display = 'none';
 } else {
     noResultsMessage.style.display = 'block';
 }
}
searchInput.placeholder = languageTexts[currentLanguage]['searchPlaceholder'];
noResultsMessage.innerText = languageTexts[currentLanguage]['noResultsMessage'];