const { toMultiLevel, toSingleLevel } = require("./logic");

describe("product core logic", () => {
  const forms = [
    {
      name: "box",
      coefficient: 1,
      price: 10,
    },
    {
      name: "tablet",
      coefficient: 5,
      price: 10,
    },
    {
      name: "pill",
      coefficient: 24,
      price: 10,
    },
  ];

  const multiLevel = [
    { name: "box", coefficient: 1, price: 10, quantity: 20 },
    { name: "tablet", coefficient: 5, price: 10, quantity: 4 },
    { name: "pill", coefficient: 24, price: 10, quantity: 4 },
  ];

  const singleLevel = 2500;

  test("should convert to multi level", () => {
    const result = toMultiLevel(forms, singleLevel);

    expect(result).toMatchObject(multiLevel);
  });

  test("should convert to single level", () => {
    const result = toSingleLevel(forms, multiLevel);

    expect(result).toBe(singleLevel);
  });
});
