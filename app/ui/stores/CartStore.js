import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class CartStore {
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
      this.cartUI.items.push(activeProduct);
    } else {
      console.log("product already exist");
      this.removeActiveProductFromCart(activeProduct);
      this.addActiveProductToCart(activeProduct);
    }
  };

  @action removeActiveProductFromCart = (activeProduct) => {
    console.log("removeActiveProductFromCart");
    this.cartUI.items = this.cartUI.items.filter(
      ({ id }) => id !== activeProduct.id
    );
  };

  @action submitCarttoSale = () => {
    let cart = { items: [] };
    this.cartUI.items.forEach((product) => {
      let tempForm = [];
      product.inventory.forEach((form) => {
        tempForm.push({
          price: form.price,
          quantity: form.quantity,
        });
      });
      cart.items.push({
        productId: product.id,
        quantity: tempForm,
        price: 0,
      });
    });
    console.log(cart);
    return axios.post("/sales", cart);
    // don't forget to clear cart;
  };

  @action
  clearCart = () => {
    this.cartUI = { items: [] };
  };

  @computed get cartTotal() {
    if (this.cartUI.items.length === 0) return 0;
    let total = 0;
    this.cartUI.items.forEach((product) => {
      product.inventory.forEach((form) => {
        total += form.price * form.quantity;
      });
    });
    return total;
  }
}

export default new CartStore();
