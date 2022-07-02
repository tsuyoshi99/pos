import { observable, action, computed, makeObservable } from "mobx";

class ProductStore {
  @observable products = [
    {
      id: 1,
      title: "Synthroid",
      price: 1994,
      quantity: 1,
      indicator: "Pill(s)",
    },
    { id: 2, title: "Crestor", price: 1972, quantity: 3, indicator: "Pill(s)" },
    {
      id: 3,
      title: "Ventolin",
      price: 1974,
      quantity: 5,
      indicator: "Pill(s)",
    },
    { id: 4, title: "Nexium", price: 2008, quantity: 4, indicator: "Pill(s)" },
    {
      id: 5,
      title: "Advair Diskus",
      price: 1957,
      quantity: 2,
      indicator: "Pill(s)",
    },
    {
      id: 6,
      title: "Lantus Solostar",
      price: 1993,
      quantity: 7,
      indicator: "Pill(s)",
    },
    {
      id: 7,
      title: "Vyvanse",
      price: 1994,
      quantity: 12,
      indicator: "Pill(s)",
    },
    { id: 8, title: "Lyrica", price: 2003, quantity: 4, indicator: "Pill(s)" },
  ];

  constructor() {
    makeObservable(this);
  }
}

export default new ProductStore();
