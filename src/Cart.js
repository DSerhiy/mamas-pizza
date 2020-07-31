export class Cart {
  constructor() {
    this.productList = [];
  }

  add(product) {
    this.productList.push(product);
  }

  remove(productId) {
    const index = this.products.findIndex(item => item.id === productId);
    this.products.splice(index, 1);
  }
}

export class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}