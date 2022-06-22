import { observable, action, computed, makeObservable } from "mobx";

class CartStore {
  @observable cart = [];

  constructor() {
    makeObservable(this);
  }

  @action
  addToCart = (product) => {
    if (this.productExist(product)) {
      console.log("this product already exist");
      this.cart = this.cart.map((obj) => {
        if (obj.id === product.id) {
          return { ...obj, quantity: obj.quantity + 1 };
        }
        return obj;
      });
      return;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  };

  @action
  removeFromCart = (product) => {
    this.cart = this.cart.filter((p) => p.id !== product.id);
  };

  @action
  clearCart = () => {
    this.cart = [];
  };

  @action
  productExist = (product) => {
    return this.cart.some((obj) => {
      return obj.id === product.id;
    });
  };

  @computed get cartTotal() {
    return this.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }
}

export default new CartStore();
