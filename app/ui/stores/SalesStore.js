import { observable, action, computed, makeObservable } from "mobx";
import axios from "../axios";

class SalesStore {
  @observable sales = [];
  @observable salesCount = 0;

  constructor() {
    makeObservable(this);
  }

  @action setSales = (sales) => {
    this.sales = sales;
  };

  @action setSalesCount = (count) => {
    this.salesCount = count;
  };

  @action getAllSales = async () => {
    const res = await axios.get("/sales");
    this.setSales(res.data.data);
    this.setSalesCount(res.data.total);
  };
}

export default new SalesStore();
