test("convert to multi level", () => {
  const productType = {
    name: "box",
    coefficient: null,
    productType: {
      name: "tablet",
      coefficient: 5,
      productType: {
        name: "pill",
        coefficient: 10,
      },
    },
  };

  const input = {
    pill: 500,
  };

  const output = {
    box: 10,
    tablet: 0,
    pill: 0,
  };

  expect(toMultiLevel()).toBe(output);
});
