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
      // let tempForm = [];
      // activeProduct.inventory.forEach((form) => {
      //   tempForm.push({
      //     price: form.price,
      //     quantity: form.quantity,
      //   });
      // });
      // const tempProduct = { productId: activeProduct.id, quantity: tempForm };
      // this.cart.items.push(tempProduct);
      this.cartUI.items.push(activeProduct);
    } else {
      console.log("product already exist");
    }
  };

  @action submitCarttoSale = () => {
    let cart = { items: [{}] };
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
      });
    });
    return axios.post("/sales", this.cart);
    // don't forget to clear cart;
  };

  @action
  removeFromCart = (product) => {
    // TODO: set product quantity to 0 based on index
  };

  @action
  clearCart = () => {
    this.cartUI = { items: [] };
  };
}

export default new CartStore();
