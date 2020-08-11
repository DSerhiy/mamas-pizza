export class Cart {
  constructor() {
    this.productList = [];
  }

  add(id, qtty) {
    const index = this.productList.findIndex(item => item.id === id);

    if (index !== -1) 
      this.productList[index].qtty += qtty;
    else 
      this.productList.push({ id, qtty });

    console.log(this);
  }

  remove(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index !== -1)
      this.products.splice(index, 1);
    
    console.log(this);
  }
}