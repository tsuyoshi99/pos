import { observable, action, computed, makeObservable } from "mobx";

class CartStore {
  @observable cart = [];
  @observable activeModal = {
    id: 6,
    name: "paracetamol21",
    description:
      "Paracetamol, also known as acetaminophen, is a medication used to treat fever and mild to moderate pain.",
    price: null,
    forms: [
      {
        name: "box",
        coefficient: 6,
        price: 10,
        quantity: 0,
      },
      {
        name: "tablet",
        coefficient: 6,
        price: 10,
        quantity: 0,
      },
    ],
    inventory: {
      quantity: 200,
    },
  };

  constructor() {
    makeObservable(this);
  }

  @action setActiveModal = (modal) => {
    this.activeModal = modal;
  };

  @action
  addToCart = (product, coefficient, quantity) => {
    if (this.productExist(product, coefficient)) {
      this.cart = this.cart.map((obj) => {
        if (obj.id === product.id && obj.coefficient === coefficient) {
          return { ...obj, quantity: obj.quantity + quantity };
        }
        return obj;
      });
      return;
    } else {
      this.cart.push({
        ...product,
        coefficient: coefficient,
        quantity: quantity,
      });
    }
  };

  @action
  removeFromCart = (product) => {
    this.cart = this.cart.filter(
      (p) => p.id !== product.id || p.coefficient !== product.coefficient
    );
  };

  @action
  clearCart = () => {
    this.cart = [];
  };

  @action
  productExist = (product, coefficient) => {
    return this.cart.some((obj) => {
      return obj.id === product.id && obj.coefficient === coefficient;
    });
  };

  @computed get cartTotal() {
    return this.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }
}

export default new CartStore();
