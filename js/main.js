let cart = {}; //моя корзина

loadGoods();

function loadGoods() {

    //loading goods on the page

    const goodsUrl = 'goods.json';
    const xhr = new XMLHttpRequest();

    xhr.onload = ()=>{
      if(xhr.status === 200){
          const goodsData = JSON.parse(xhr.responseText);
          renderGoods(goodsData);
      }
    };

    xhr.open("GET", goodsUrl, true);
    xhr.send();
}

function renderGoods(data) {

    let out = '';
    const catalogPizza = document.querySelector('.catalog__pizza');
    const catalogSalad = document.querySelector('.catalog__salad');
    const catalogDrinks = document.querySelector('.catalog__drinks');

    data.pizza.forEach((pizza)=>{

        out+=`<article class="pizza__item item" data-art="${pizza.article}">`;
        out+=`<img class="item__photo" src="${pizza.image}">`;
        out+=`<h2 class="item__header">${pizza.name}</h2>`;
        out+=`<p class="item__description">${pizza.description}</p>`;
        out+=`<p class="item__size">Цена:`;
        out+=`<span class="item__price">${pizza.price} грн.</span>`;
        out+='</p>';

        out+='<div class="item__order order">\n' +
            '<div class="order__btn add-to-cart">В корзину</div>\n' +
            '<div class="order__qtty">1</div>\n' +
            '<div class="order__btn-counter btn-counter">\n' +
            '<div id="btn" class="btn-counter__increase">+</div>\n' +
            '<div class="btn-counter__decrease">-</div>\n' +
            '</div>\n' +
            '</div>';
        out+='</article>';

    });
    catalogPizza.innerHTML = out;
    out = '';

    data.salads.forEach((salad)=>{

        out+=`<article class="salad__item item" data-art="${salad.article}">`;
        out+=`<img class="item__photo" src="${salad.image}">`;
        out+=`<h2 class="item__header">${salad.name}</h2>`;
        out+=`<p class="item__description">${salad.description}</p>`;
        out+=`<p class="item__size">Цена: `;
        out+=`<span class="item__price">${salad.price} грн.</span>`;
        out+='</p>';

        out+='<div class="item__order order">\n' +
            '<div class="order__btn add-to-cart">В корзину</div>\n' +
            '<div class="order__qtty">1</div>\n' +
            '<div class="order__btn-counter btn-counter">\n' +
            '<div id="btn" class="btn-counter__increase">+</div>\n' +
            '<div class="btn-counter__decrease">-</div>\n' +
            '</div>\n' +
            '</div>';
        out+='</article>';

    });
    catalogSalad.innerHTML = out;
    out = '';

    data.drinks.forEach((drink)=>{

        out+=`<article class="drink__item item" data-art="${drink.article}">`;
        out+=`<img class="item__photo" src="${drink.image}">`;
        out+=`<h2 class="item__header">${drink.name}</h2>`;
        out+=`<p class="item__description">${drink.description}</p>`;
        out+=`<p class="item__size">Цена: `;
        out+=`<span class="item__price">${drink.price} грн.</span>`;
        out+='</p>';

        out+='<div class="item__order order">\n' +
            '<div class="order__btn add-to-cart">В корзину</div>\n' +
            '<div class="order__qtty">1</div>\n' +
            '<div class="order__btn-counter btn-counter">\n' +
            '<div id="btn" class="btn-counter__increase">+</div>\n' +
            '<div class="btn-counter__decrease">-</div>\n' +
            '</div>\n' +
            '</div>';
        out+='</article>';

    });
    catalogDrinks.innerHTML = out;
    out = '';

    // event handler for btn_counter__increase
    const btnIncrease = document.querySelectorAll('.btn-counter__increase');
    btnIncrease.forEach((btn)=>btn.addEventListener('click', increaseQtty));
    function increaseQtty(e) {
        const qttyField = e.target.parentElement.previousElementSibling;
        let intQtty = Number(qttyField.textContent);

        intQtty++;
        qttyField.textContent = intQtty;
    }

    // event handler for btn_counter__decrease
    const btnDecrease = document.querySelectorAll('.btn-counter__decrease');
    btnDecrease.forEach((btn)=>btn.addEventListener('click', decreaseQtty));
    function decreaseQtty(e){
        const qttyField = e.target.parentElement.previousElementSibling;
        let intQtty = Number(qttyField.textContent);
        if(intQtty !== 1) {
            intQtty--;
            qttyField.textContent = intQtty;
        }
    }

    // event handler for btn add to cart
    const btnAddToCart = document.querySelectorAll('.add-to-cart');
    btnAddToCart.forEach((btn)=>btn.addEventListener('click', popupWindowShow));
    function popupWindowShow(){document.querySelector('.popupWindow').classList.remove('hidden')}

    //event handler for item__photo click

    const itemsPhoto = document.querySelectorAll(".item__photo");
    itemsPhoto.forEach((item)=>item.addEventListener("click", showSlide));

    function showSlide(e){
        console.log(e.target);
    }

}

//event handler for btn-close of popup window
const btnClose = document.querySelector('.popupWindow__btn-close');
btnClose.addEventListener('click', closeWindow);
function closeWindow() {document.querySelector('.popupWindow').classList.add('hidden')}

// event handler to highlight navigation menu
window.onscroll = ()=> {
    const pizza = document.getElementById('pizza');
    const salads = document.getElementById('salads');
    const drinks = document.getElementById('drinks');

    const pizzaBtn = document.getElementById('nav__pizza');
    const saladsBtn = document.getElementById('nav__salads');
    const drinksBtn = document.getElementById('nav__drinks');

    if(window.pageYOffset >= (pizza.offsetTop) && window.pageYOffset < (salads.offsetTop)){
        pizzaBtn.classList.add('active');
        saladsBtn.classList.remove('active');
        drinksBtn.classList.remove('active');
    } else if (window.pageYOffset >= (salads.offsetTop) && window.pageYOffset < (drinks.offsetTop)){
        saladsBtn.classList.add('active');
        pizzaBtn.classList.remove('active');
        drinksBtn.classList.remove('active');
    } else if (window.pageYOffset >= (drinks.offsetTop)){
        saladsBtn.classList.remove('active');
        pizzaBtn.classList.remove('active');
        drinksBtn.classList.add('active');
    } else {
        saladsBtn.classList.remove('active');
        pizzaBtn.classList.remove('active');
        drinksBtn.classList.remove('active');
    }
};


//
// function addToCart() {
//
//     const articul =  $(this).closest(".item").attr("data-art");
//     const orderQtty = Number($(this).siblings(".order__qtty").html());
//
//     if (cart[articul] === undefined) {
//         cart[articul] = orderQtty;
//     } else {
//         cart[articul] += orderQtty;
//     }
//
//     $(this).siblings(".order__qtty").html(1);
//
//     showMiniCart();
//
//     console.log(articul + '---' + cart[articul]);
// }
//
// function showMiniCart() {
//
//     let out = '';
//     for (let art in cart) {
//         out += art + ' --- ' + cart[art] + '<br>'
//     }
//
//     $('.miniCart').html(out);
//
// }
// with JQuery

// function loadGoods() {
//
//     $.getJSON('pizza.json', (data)=>{
//
//         console.log(data);
//
//         let out = '';
//
//         for (let key in data) {
//             out+=`<section class="catalog__item item" data-art="${key}">`;
//             out+=`<img class="item__photo" src="${data[key].image}">`;
//             out+=`<h2 class="item__header">${data[key].name}</h2>`;
//             out+=`<p class="item__description">${data[key].description}</p>`;
//             out+=`<p class="item__size">Размер ${data[key].size} см`;
//             out+=`<span class="item__price">${data[key].price} грн.</span>`;
//             out+='</p>';
//
//             out+='<div class="item__order order">\n' +
//                    '<div class="order__btn add-to-cart">В корзину</div>\n' +
//                    '<div class="order__qtty">1</div>\n' +
//                    '<div class="order__btn-counter btn-counter">\n' +
//                      '<div class="btn-counter__increase">+</div>\n' +
//                      '<div class="btn-counter__decrease">-</div>\n' +
//                    '</div>\n' +
//                  '</div>';
//             out+='</section>';
//         }
//
//         $('.catalog').html(out);
//
//         $(".btn-counter__increase").on("click", (event)=>{
//
//             const $orderQtty = $(event.currentTarget).parent().siblings('.order__qtty');
//             let currentQtty = Number($orderQtty.html());
//             currentQtty++;
//             $orderQtty.html(currentQtty);
//         });
//
//         $(".btn-counter__decrease").on("click", (event)=>{
//
//             const $orderQtty = $(event.currentTarget).parent().siblings('.order__qtty');
//             let currentQtty = Number($orderQtty.html());
//             if(currentQtty != 1) {
//                 currentQtty--;
//                 $orderQtty.html(currentQtty);
//             }
//         });
//
//         $(".add-to-cart").on("click", addToCart);
//
//     });
//
//
//
// } -