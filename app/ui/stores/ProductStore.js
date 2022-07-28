import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class ProductStore {
  @observable products = [];
  @observable productCounts = 0;
  @observable addProductVisible = false;

  constructor() {
    makeObservable(this);
  }

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

  @action updateProduct(inventory, id) {
    return axios.put(`/products/${id}`, inventory);
  }

  @action deleteProduct(id) {
    return axios.delete(`/products/${id}`);
  }

  @computed get allProducts() {
    return this.products;
  }
}

export default new ProductStore();
