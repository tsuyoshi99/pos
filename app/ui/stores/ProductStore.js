import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class ProductStore {
  @observable products = [];
  @observable productCounts = 0;

  @observable addProductVisible = false;

  @action toggleAddProductVisible = (boolean) => {
    this.addProductVisible = boolean;
  };

  @action setProducts = (products) => {
    this.products = products;
  };

  @action setProductCounts = (count) => {
    this.productCounts = count;
  };

  @action getAllProducts = async () => {
    const res = await axios.get("/products");
    this.setProducts(res.data.data);
    this.setProductCounts(res.data.total);
    // console.log(res.data.total);
    // console.log(res.data.data);
  };

  @action addProduct(product) {
    return axios.post("/products", product);
  }

  @computed get allProducts() {
    return this.products;
  }

  constructor() {
    makeObservable(this);
  }
}

export default new ProductStore();
