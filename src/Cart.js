export class Cart {
  constructor() {
    this.productList = [];
    this.subscribers = [];
  }

  add(id, qtty) {
    const index = this.productList.findIndex(item => item.id === id);

    if (index !== -1) 
      this.productList[index].qtty += qtty;
    else 
      this.productList.push({ id, qtty });

    this.cartChanged();
    console.log(this.subscribers);
  }

  remove(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index !== -1)
      this.products.splice(index, 1);

    this.cartChanged();    
    console.log(this.subscribers);
  }

  cartChanged() {
    this.subscribers.forEach(fn => {
      fn(this.productList);
    })
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }
}