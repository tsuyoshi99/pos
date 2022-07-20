import { observable, action, computed, makeObservable } from "mobx";

class ActiveProduct {
  @observable activeProduct = { id: null, name: null, inventory: [] };

  constructor() {
    makeObservable(this);
  }

  @action setActiveProduct = (product) => {
    this.activeProduct = {
      id: product.id,
      name: product.name,
      inventory: product.inventory,
    };
  };

  @action clearActiveProduct = () => {
    this.activeProduct = { id: null, name: null, inventory: [] };
  };
}

export default new ActiveProduct();
