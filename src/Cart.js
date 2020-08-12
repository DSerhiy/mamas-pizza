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
  }

  remove(id) {
    const index = this.productList.findIndex(item => item.id === id);
    if (index !== -1)
      this.productList.splice(index, 1);

    this.cartChanged();  
  }

  getTotalSum() {
    return this.productList.reduce((acc, cur) => {
      console.log(acc, cur);
      return acc + cur.price1 * cur.qtty;
    }, 0)
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