import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class CartStore {
  @observable cart = { items: [{}] };
  @observable cartUI = { items: [] };

  constructor() {
    makeObservable(this);
  }

  @action
  productExist = (product) => {
    return this.cartUI.items.some((obj) => {
      return obj.id === product.id;
    });
  };

  @action addActiveProductToCart = (activeProduct) => {
    if (!this.productExist(activeProduct)) {
      let tempForm = [];
      activeProduct.inventory.forEach((form) => {
        tempForm.push({
          price: form.price,
          quantity: form.quantity,
        });
      });
      const tempProduct = { productId: activeProduct.id, quantity: tempForm };
      this.cart.items.push(tempProduct);
      this.cartUI.items.push(activeProduct);
    } else {
      // this.removeFromCart(activeProduct);
      // this.addActiveProductToCart(activeProduct);
      console.log("product already exist");
    }
  };

  @action submitCarttoSale = () => {
    return axios.post("/sales", this.cart);
    // don't forget to clear cart;
  };

  @action
  removeFromCart = (product) => {};

  @action
  clearCart = () => {
    this.cart = { items: [] };
    this.cartUI = { items: [] };
  };
}

export default new CartStore();
