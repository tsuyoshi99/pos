const { calculateTotal } = require("./sale");

describe("sale core logic", () => {
  test("calculate total", () => {
    const forms = [
      {
        name: "box",
        coefficient: 1,
        price: 10,
      },
      {
        name: "tablet",
        coefficient: 5,
        price: 3,
      },
      {
        name: "pill",
        coefficient: 24,
        price: 1,
      },
    ];

    const multiLevel = [
      {
        price: 5,
        quantity: 5,
      },
      {
        price: 3,
        quantity: 10,
      },
      {
        price: 1,
        quantity: 2,
      },
    ];

    console.log(calculateTotal(forms, multiLevel));
  });
});
