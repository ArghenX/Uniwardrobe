let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Jacket GAP',
        image: 'https://ir-1.ozone.ru/s3/multimedia-r/c1000/6754886235.jpg',
        price: 7800 
    },
    {
        id: 2,
        name: 'Jacket GAP',
        image: 'https://ir-3.ozone.ru/s3/multimedia-x/c1000/6745646445.jpg',
        price: 6500
    },
    {
        id: 3,
        name: 'Jacket GAP',
        image: 'https://ir.ozone.ru/s3/multimedia-8/c1000/6826242752.jpg',
        price: 5800
    },
    {
        id: 4,
        name: 'Hoodie GAP',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6d3Gehuf4O8vAOIYssWKosOz4vLNdPPcOw&usqp=CAUG',
        price: 3500
    },
    {
        id: 5,
        name: 'Hoodie GAP',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuZgRB90d_rjs0XtAaEoNMdyeD7yFekTFSUA&usqp=CAU',
        price: 4000
    },
    {
        id: 6,
        name: 'Hoodie GAP',
        image: 'https://sneaker-killa.ru/image/cache/catalog/general/6716/59cad322-88a6-4d22-a520-8bc77e5e83e6-jpeg-1-500x500.jpeg',
        price: 3800
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
