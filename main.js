let cart = {}; //моя корзина

loadGoods();

function arrayHelper(data) {

    let out = {};
    for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp.name = data[i].gsx$name.$t;
        temp.description = data[i].gsx$description.$t;
        temp.price1 = data[i].gsx$price1.$t;
        temp.price2 = data[i].gsx$price2.$t;
        temp.size = data[i].gsx$size.$t;
        temp.image = data[i].gsx$image.$t;

        if (out[data[i].gsx$category.$t] === undefined) {
            out[data[i].gsx$category.$t] = {};
        }
        out[data[i].gsx$category.$t][data[i].gsx$art.$t] = temp;
    }

    console.log(out);
    return out;
}
function loadGoods() {

    //loading goods on the page

    const goodsUrl = 'https://spreadsheets.google.com/feeds/list/1yzMRKxr9d1125wVDWmzznAMVEu9asOw5g1S62KIFRXU/od6/public/values?alt=json';
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status === 200) {
            let goodsData = JSON.parse(xhr.responseText);
            goodsData = goodsData.feed.entry;
            goodsData = arrayHelper(goodsData);
            renderGoods(goodsData);
        }
    };

    xhr.open("GET", goodsUrl, true);
    xhr.send();
}
function renderGoods(data) {

    let out = '';
    const catalogPizza = document.querySelector('.pizza-section__catalog');
    const catalogSalad = document.querySelector('.salad-section__catalog');
    const catalogDrinks = document.querySelector('.drink-section__catalog');

    const pizza = data.pizza;
    for (key in pizza) {

        out += `<div class="goods__item">`;
        out += `<img src="${pizza[key].image}" alt="" class="goods__item-photo">`;
        out += `<h2 class="goods__item-title">${pizza[key].name}</h2>`;
        out += `<p class="goods__item-description">${pizza[key].description}</p>`;
        out += `<div class="goods__item-size">`;
        out += `<label>`;
        out += `<input type="radio" name="${key}" class="pizzaSize" value="bigSize" checked>`;
        out += `<span>Big (500гр)</span>`;
        out += `</label>`;
        out += `<label>`;
        out += `<input type="radio" name="${key}" class="pizzaSize" value="mediumSize">`;
        out += `<span>Medium (350гр)</span>`;
        out += `</label>`;
        out += `</div>`;
        out += `<div class="goods__item-price">`;
        out += `<div>Цена:</div>`;
        out += `<div>${pizza[key].price1} грн.</div>`;
        out += `</div>`;
        out += `<div class="goods__item-ob">`;
        out += `<div class="goods__item-ob-add-to-cart-btn">B корзину</div>`;
        out += `<div class="goods__ob-quantity">1</div>`;
        out += `<div class="goods__ob-counter">`;
        out += `<div class="goods__ob-increase-btn">+</div>`;
        out += `<div class="goods__ob-decrease-btn">-</div>`;
        out += `</div>`;
        out += `</div>`;
        out += `</div>`;
    };

    catalogPizza.innerHTML = out;
    out = '';

    const salad = data.salad;
    for (key in salad) {

        out += `<div class="goods__item">`;
        out += `<img src="${salad[key].image}" alt="" class="goods__item-photo">`;
        out += `<h2 class="goods__item-title">${salad[key].name}</h2>`;
        out += `<p class="goods__item-description">${salad[key].description}</p>`;
        out += `<div class="goods__item-price">`;
        out += `<div>Цена:</div>`;
        out += `<div>${salad[key].price1} грн.</div>`;
        out += `</div>`;
        out += `<div class="goods__item-ob">`;
        out += `<div class="goods__item-ob-add-to-cart-btn">B корзину</div>`;
        out += `<div class="goods__ob-quantity">1</div>`;
        out += `<div class="goods__ob-counter">`;
        out += `<div class="goods__ob-increase-btn">+</div>`;
        out += `<div class="goods__ob-decrease-btn">-</div>`;
        out += `</div>`;
        out += `</div>`;
        out += `</div>`;
    };
    catalogSalad.innerHTML = out;
    out = '';

    const drinks = data.drinks;
    for (key in drinks) {

        out += `<div class="goods__item">`;
        out += `<img src="${drinks[key].image}" alt="" class="goods__item-photo">`;
        out += `<h2 class="goods__item-title">${drinks[key].name}</h2>`;
        out += `<p class="goods__item-description">${drinks[key].description}</p>`;
        out += `<div class="goods__item-price">`;
        out += `<div>Цена:</div>`;
        out += `<div>${drinks[key].price1} грн.</div>`;
        out += `</div>`;
        out += `<div class="goods__item-ob">`;
        out += `<div class="goods__item-ob-add-to-cart-btn">B корзину</div>`;
        out += `<div class="goods__ob-quantity">1</div>`;
        out += `<div class="goods__ob-counter">`;
        out += `<div class="goods__ob-increase-btn">+</div>`;
        out += `<div class="goods__ob-decrease-btn">-</div>`;
        out += `</div>`;
        out += `</div>`;
        out += `</div>`;

    };
    catalogDrinks.innerHTML = out;
    out = '';

    // event handler for radio btn pizzaSize
    const btnRadioPizzaSize = document.querySelectorAll('.pizzaSize');
    btnRadioPizzaSize.forEach((btn) => btn.addEventListener('click', switchPizzaSize));
    function switchPizzaSize(e) {
        const pizzaArt = e.target.name;
        const pizzaSize = e.target.value;
        const priceElement = e.target.parentElement.parentElement.nextElementSibling.lastChild;

        if (pizzaSize === 'bigSize') {
            priceElement.innerHTML = `${data.pizza[pizzaArt].price1} грн.`;
        } else {
            priceElement.innerHTML = `${data.pizza[pizzaArt].price2} грн.`;
        }
    }
    // event handler for btn_counter__increase
    const btnIncrease = document.querySelectorAll('.goods__ob-increase-btn');
    btnIncrease.forEach((btn) => btn.addEventListener('click', increaseQtty));
    function increaseQtty(e) {
        const qttyField = e.target.parentElement.previousElementSibling;
        let intQtty = Number(qttyField.textContent);

        intQtty++;
        qttyField.textContent = intQtty;
    }

    // event handler for btn_counter__decrease
    const btnDecrease = document.querySelectorAll('.goods__ob-decrease-btn');
    btnDecrease.forEach((btn) => btn.addEventListener('click', decreaseQtty));
    function decreaseQtty(e) {
        const qttyField = e.target.parentElement.previousElementSibling;
        let intQtty = Number(qttyField.textContent);
        if (intQtty !== 1) {
            intQtty--;
            qttyField.textContent = intQtty;
        }
    }

    // event handler to highlight navigation menu
    window.onscroll = () => {
        const pizza = document.getElementById('pizza');
        const salads = document.getElementById('salads');
        const drinks = document.getElementById('drinks');
        const contacts = document.getElementById('contacts');

        const pizzaBtn = document.getElementById('nav__pizza');
        const saladsBtn = document.getElementById('nav__salads');
        const drinksBtn = document.getElementById('nav__drinks');
        const contactsBtn = document.getElementById('nav__contacts');
        console.log(contactsBtn);

        if (window.pageYOffset >= (pizza.offsetTop) && window.pageYOffset < (salads.offsetTop)) {
            pizzaBtn.classList.add('active');
            saladsBtn.classList.remove('active');
            drinksBtn.classList.remove('active');
            contactsBtn.classList.remove('active');
        } else if (window.pageYOffset >= (salads.offsetTop) && window.pageYOffset < (drinks.offsetTop)) {
            saladsBtn.classList.add('active');
            pizzaBtn.classList.remove('active');
            drinksBtn.classList.remove('active');
            contactsBtn.classList.remove('active');
        } else if (window.pageYOffset >= (drinks.offsetTop) && window.pageYOffset < (contacts.offsetTop)) {
            console.log(drinks.offsetTop);
            console.log(contacts.offsetTop);
            console.log(window.pageYOffset)
            saladsBtn.classList.remove('active');
            pizzaBtn.classList.remove('active');
            contactsBtn.classList.remove('active');
            drinksBtn.classList.add('active');
        } else if (window.pageYOffset >= (contacts.offsetTop)) {
            saladsBtn.classList.remove('active');
            pizzaBtn.classList.remove('active');
            drinksBtn.classList.remove('active');
            contactsBtn.classList.add('active');
        }
    }


    //     // event handler for btn add to cart
    //     const btnAddToCart = document.querySelectorAll('.add-to-cart');
    //     btnAddToCart.forEach((btn) => btn.addEventListener('click', popupWindowShow));
    //     function popupWindowShow() { document.querySelector('.popupWindow').classList.remove('hidden') }

    //     //event handler for item__photo click

    //     const itemsPhoto = document.querySelectorAll(".item__photo");
    //     itemsPhoto.forEach((item) => item.addEventListener("click", showSlide));

    //     function showSlide(e) {
    //         console.log(e.target);
    //     }
    // }

    // //event handler for btn-close of popup window
    // const btnClose = document.querySelector('.popupWindow__btn-close');
    // btnClose.addEventListener('click', closeWindow);
    // function closeWindow() { document.querySelector('.popupWindow').classList.add('hidden') }

}

