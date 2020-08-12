import { Cart } from './Cart'

let productsData;
const cart = new Cart(); //моя корзина

cart.subscribe(data => {
  const cartEl = document.querySelector('.cart');
  let out = ''
  
  data.forEach(item => {
    const product = productsData.find(product => product.id === item.id);
    out += `
    <div class="cart__item">
      <div class="cart__item-header">
        <div class="cart__item-title">${product.name}</div>
        <div class="cart__item-remove-btn" data-id="${product.id}"><i class="fas fa-times"></i></div>
      </div>
      <div class="cart__item-price-panel">
        <div class="cart__item-price">${product.price1} x ${item.qtty} = ${product.price1 * item.qtty} грн.</div>
        <div class="quantity-control">
          <div class="quantity-control__btn-add">+</div>
          <span class="quantity-control__text">${item.qtty}</span>
          <div class="quantity-control__btn-reduce">-</div>
        </div>
      </div>
    </div>`;

  })

  out += `
  <div class="cart__item">
      Всего: ${cart.getTotalSum()}грн.
  </div>`;

  cartEl.innerHTML = out;

  const cartBtnsRemove = cartEl.querySelectorAll('.cart__item-remove-btn');
  cartBtnsRemove.forEach(btn => {
    btn.addEventListener('click', e => {
      cart.remove(e.currentTarget.dataset.id);
    })
  })
})

loadGoods();

function arrayHelper(data) {
  let out = [];
  for (let i = 0; i < data.length; i++) {
    let temp = {};

    temp.id = data[i].gsx$art.$t;
    temp.category = data[i].gsx$category.$t;
    temp.name = data[i].gsx$name.$t;
    temp.description = data[i].gsx$description.$t;
    temp.price1 = data[i].gsx$price1.$t;
    temp.price2 = data[i].gsx$price2.$t;
    temp.size = data[i].gsx$size.$t;
    temp.image = data[i].gsx$image.$t;

    out.push(temp);
  }

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
      productsData = goodsData;
      renderGoods(goodsData);
    }
  };

  xhr.open("GET", goodsUrl, true);
  xhr.send();
}

function renderGoods(productsSource) {

  const catalogPizza = document.querySelector('.pizza-section__catalog');
  const catalogSalad = document.querySelector('.salad-section__catalog');
  const catalogDrinks = document.querySelector('.drink-section__catalog');

  let pizzaHtml = '';
  let salatHtml = '';
  let drinksHtml = '';

  productsSource.forEach(product => {
    switch (product.category) {
      case 'pizza':

        pizzaHtml +=
        `<div class="goods__item">
          <img src="${product.image}" alt="" class="goods__item-photo">
          <h2 class="goods__item-title">${product.name}</h2>
          <p class="goods__item-description">${product.description}</p>
          <div class="goods__item-price">
            <div>Цена (500гр):</div>
            <div>${product.price1} грн.</div>
          </div>
          <div class="goods__item-ob">
            <div class="goods__item-ob-add-to-cart-btn" data-id="${product.id}">B корзину</div>
            <div class="goods__ob-quantity">1</div>
            <div class="goods__ob-counter">
              <div class="goods__ob-increase-btn">+</div>
              <div class="goods__ob-decrease-btn">-</div>
            </div>
          </div>
        </div>`

        break;
      case 'salad':

        salatHtml += 
        `<div class="goods__item">
          <img src="${product.image}" alt="" class="goods__item-photo">
          <h2 class="goods__item-title">${product.name}</h2>
          <p class="goods__item-description">${product.description}</p>
          <div class="goods__item-price">
            <div>Цена:</div>
            <div>${product.price1} грн.</div>
          </div>
          <div class="goods__item-ob">
            <div class="goods__item-ob-add-to-cart-btn" data-id="${product.id}">B корзину</div>
            <div class="goods__ob-quantity">1</div>
            <div class="goods__ob-counter">
              <div class="goods__ob-increase-btn">+</div>
              <div class="goods__ob-decrease-btn">-</div>
            </div>
          </div>
        </div>`
        
        break;
      case 'drinks':

      drinksHtml += 
      `<div class="goods__item">
        <img src="${product.image}" alt="" class="goods__item-photo">
        <h2 class="goods__item-title">${product.name}</h2>
        <p class="goods__item-description">${product.description}</p>
        <div class="goods__item-price">
          <div>Цена:</div>
          <div>${product.price1} грн.</div>
        </div>
        <div class="goods__item-ob">
          <div class="goods__item-ob-add-to-cart-btn" data-id="${product.id}">B корзину</div>
          <div class="goods__ob-quantity">1</div>
          <div class="goods__ob-counter">
            <div class="goods__ob-increase-btn">+</div>
            <div class="goods__ob-decrease-btn">-</div>
          </div>
        </div>
      </div>`
        
        break;
    
      default:
        break;
    }
  })

  catalogPizza.innerHTML = pizzaHtml;
  catalogSalad.innerHTML = salatHtml;
  catalogDrinks.innerHTML = drinksHtml;  
  

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
  const pizzaAnchor = document.getElementById('pizza-anchor');
  const saladAnchor = document.getElementById('salad-anchor');
  const drinkAnchor = document.getElementById('drink-anchor');
  const deliveryAnchor = document.getElementById('delivery-anchor');

  const pizzaBtn = document.querySelector("a[href='#pizza-anchor']");
  const saladsBtn = document.querySelector("a[href='#salad-anchor']");
  const drinksBtn = document.querySelector("a[href='#drink-anchor']");
  const contactsBtn = document.querySelector("a[href='#delivery-anchor']");

  window.onscroll = () => {

    if (window.pageYOffset >= (pizzaAnchor.offsetTop - 2) && window.pageYOffset < (saladAnchor.offsetTop - 2)) {
      pizzaBtn.classList.add('active');
      saladsBtn.classList.remove('active');
      drinksBtn.classList.remove('active');
      contactsBtn.classList.remove('active');
    } else if (window.pageYOffset >= (saladAnchor.offsetTop - 2) && window.pageYOffset < (drinkAnchor.offsetTop)) {
      saladsBtn.classList.add('active');
      pizzaBtn.classList.remove('active');
      drinksBtn.classList.remove('active');
      contactsBtn.classList.remove('active');
    } else if (window.pageYOffset >= (drinkAnchor.offsetTop) && window.pageYOffset < (deliveryAnchor.offsetTop - 2)) {
      saladsBtn.classList.remove('active');
      pizzaBtn.classList.remove('active');
      contactsBtn.classList.remove('active');
      drinksBtn.classList.add('active');
    } else if (window.pageYOffset >= (deliveryAnchor.offsetTop - 2)) {
      saladsBtn.classList.remove('active');
      pizzaBtn.classList.remove('active');
      drinksBtn.classList.remove('active');
      contactsBtn.classList.add('active');
    }
  }
      
  // event handler for btn add to cart
  const btnAddToCart = document.querySelectorAll('.goods__item-ob-add-to-cart-btn');
  btnAddToCart.forEach(btn => btn.addEventListener('click', addToCart));

  function addToCart(e) {
    const productId = e.target.dataset.id;
    const productQtty = +e.target.nextElementSibling.textContent;
    cart.add(productId, productQtty);    
  }
 
  // function popupWindowShow() { document.querySelector('.popupWindow').classList.remove('hidden') }

      // //event handler for item__photo click

      // const itemsPhoto = document.querySelectorAll(".item__photo");
      // itemsPhoto.forEach((item) => item.addEventListener("click", showSlide));

      // function showSlide(e) {
      //     console.log(e.target);
      // }


  //event handler for btn-close of popup window
  // const btnClose = document.querySelector('.popupWindow__btn-close');
  // btnClose.addEventListener('click', closeWindow);
  // function closeWindow() { document.querySelector('.popupWindow').classList.add('hidden') }

}

//   out += `<div class="goods__item">`;
  //   out += `<img src="${product.image}" alt="" class="goods__item-photo">`;
  //   out += `<h2 class="goods__item-title">${product.name}</h2>`;
  //   out += `<p class="goods__item-description">${product.description}</p>`;

  //   out += `<div class="goods__item-price">`;
  //   out += `<div>Цена (500гр):</div>`;
  //   out += `<div>${product.price1} грн.</div>`;
  //   out += `</div>`;
  //   out += `<div class="goods__item-ob">`;
  //   out += `<div class="goods__item-ob-add-to-cart-btn">B корзину</div>`;
  //   out += `<div class="goods__ob-quantity">1</div>`;
  //   out += `<div class="goods__ob-counter">`;
  //   out += `<div class="goods__ob-increase-btn">+</div>`;
  //   out += `<div class="goods__ob-decrease-btn">-</div>`;
  //   out += `</div>`;
  //   out += `</div>`;
  //   out += `</div>`;
  // };


  // event handler for radio btn pizzaSize
  // const btnRadioPizzaSize = document.querySelectorAll('.pizzaSize');
  // btnRadioPizzaSize.forEach((btn) => btn.addEventListener('click', switchPizzaSize));
  // function switchPizzaSize(e) {
  //     const pizzaArt = e.target.name;
  //     const pizzaSize = e.target.value;
  //     const priceElement = e.target.parentElement.parentElement.nextElementSibling.lastChild;

  //     if (pizzaSize === 'bigSize') {
  //         priceElement.innerHTML = `${data.pizza[pizzaArt].price1} грн.`;
  //     } else {
  //         priceElement.innerHTML = `${data.pizza[pizzaArt].price2} грн.`;
  //     }
  // }