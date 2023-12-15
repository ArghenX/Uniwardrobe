var products = [
    {
        name: 'GAP',
        variants: [
            { size: 's', color: 'black', initialQuantity: 5, remainingQuantity: 5 },
            { size: 's', color: 'white', initialQuantity: 5, remainingQuantity: 5 },
            { size: 'm', color: 'black', initialQuantity: 5, remainingQuantity: 5 },
            // Добавьте другие варианты цветов и размеров
        ]
    },
    // Добавьте информацию о других товарах по аналогии
];

var cart = [];

function addToCart() {
    var productName = 'GAP';
    var quantity = parseInt(document.getElementById('quantity').value);
    var selectedSize = document.getElementById('size').value;
    var selectedColor = document.getElementById('color').value;

    var selectedProduct = products.find(product => product.name === productName);

    if (quantity > 0 && validateVariant(selectedProduct, selectedSize, selectedColor, quantity)) {
        cart.push({ product: productName, quantity: quantity, size: selectedSize, color: selectedColor });
        updateRemainingQuantity(selectedProduct, selectedSize, selectedColor, quantity);
        updateCart();
        updateProductQuantityOnPage();
        resetInputFields(); // Очищаем поля ввода
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
    var selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    return selectedVariant && selectedVariant.remainingQuantity >= quantity;
}

function updateRemainingQuantity(product, size, color, quantity) {
    var selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    if (selectedVariant) {
        selectedVariant.remainingQuantity -= quantity;
    }
}

function getProductRemainingQuantity(productName, size, color) {
    var product = products.find(item => item.name === productName);
    var selectedVariant = product.variants.find(variant => variant.size === size && variant.color === color);
    return selectedVariant ? selectedVariant.remainingQuantity : 0;
}

function updateCart() {
    var cartItemsDiv = document.getElementById('cartItems');
    var cartItems = cart.map(item => `<p>${item.product}, Размер: ${item.size}, Количество: ${item.quantity} <button onclick="removeFromCart('${item.product}', '${item.size}', '${item.color}', ${item.quantity})">Удалить</button></p>`);

    cartItemsDiv.innerHTML = cartItems.join('');
    updateRemainingQuantityDisplay();
}

function updateRemainingQuantityDisplay() {
    var remainingQuantityElement = document.getElementById('remainingQuantity');
    var productName = 'GAP';
    var selectedSize = document.getElementById('size').value;
    var selectedColor = document.getElementById('color').value;

    var remainingQuantity = getProductRemainingQuantity(productName, selectedSize, selectedColor);
    remainingQuantityElement.innerText = `Осталось: ${remainingQuantity} шт.`;
}

function removeFromCart(productName, size, color, quantity) {
    var removedItemIndex = cart.findIndex(item => item.product === productName && item.size === size && item.color === color && item.quantity === quantity);

    if (removedItemIndex !== -1) {
        cart.splice(removedItemIndex, 1);
        restoreRemainingQuantity(productName, size, color, quantity);
        updateCart();
        updateProductQuantityOnPage();
    }
}

function restoreRemainingQuantity(productName, size, color, quantity) {
    var selectedProduct = products.find(product => product.name === productName);
    if (selectedProduct) {
        var selectedVariant = selectedProduct.variants.find(variant => variant.size === size && variant.color === color);
        if (selectedVariant) {
            selectedVariant.remainingQuantity += quantity;
        }
    }
}

function updateProductQuantityOnPage() {
    var productName = 'GAP';
    var productQuantityElement = document.getElementById('remainingQuantity');
    var selectedSize = document.getElementById('size').value;
    var selectedColor = document.getElementById('color').value;

    var product = products.find(item => item.name === productName);
    if (product) {
        var selectedVariant = product.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);
        if (selectedVariant) {
            productQuantityElement.innerText = `Осталось: ${selectedVariant.remainingQuantity} шт.`;
        }
    }
}

// Остальной код...

// Обновление текста на нескольких языках
var currentLanguage = 'ru';

var languageTexts = {
    'ru': {
        'checkoutButton': 'Оформить заказ',
        'searchPlaceholder': 'Поиск товаров...',
        // Добавьте другие тексты по аналогии
    },
    'en': {
        'checkoutButton': 'Checkout',
        'searchPlaceholder': 'Search for products...',
        // Добавьте другие тексты по аналогии
    }
};

function changeLanguage(language) {
    currentLanguage = language;
    updateText();
}

function updateText() {
    var checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.innerText = languageTexts[currentLanguage]['checkoutButton'];

    var searchInput = document.getElementById('searchInput');
    searchInput.placeholder = languageTexts[currentLanguage]['searchPlaceholder'];

    // Продолжайте аналогично для других текстовых элементов на странице
}

// Вызовите функцию обновления текста при загрузке страницы
updateText();
// main.js

function checkout() {
    // Ваш код для оформления заказа

    // В данном примере, просто выведем в консоль сообщение об успешном оформлении заказа
    console.log('Заказ успешно оформлен!');

    // Если у вас есть специфические действия для оформления заказа, добавьте их сюда
    // Например, очистка корзины, перенаправление на страницу подтверждения заказа и т.д.
    window.location.href = 'checkout.html';
}
