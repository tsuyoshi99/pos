exports.toMultiLevel = (originalForms, quantity) => {
  forms = [...originalForms];
  forms.reverse();

  let currentLevel = quantity;

  const multiLevel = forms.reduce((total, form, i) => {
    const remainder = currentLevel % form.coefficient;
    currentLevel -= remainder;
    currentLevel = Math.floor(currentLevel / form.coefficient);

    total.push({
      name: form.name,
      coefficient: form.coefficient,
      price: parseFloat(form.price),
      quantity: forms.length - 1 === i ? currentLevel : remainder,
    });

    return total;
  }, []);

  return multiLevel.reverse();
};

exports.toSingleLevel = (forms, quantities) => {
  return forms.reduce((total, _, i) => {
    if (i === 0) total = quantities[i].quantity;
    if (forms.length - 1 === i) return total;

    total = total * forms[i + 1].coefficient + quantities[i + 1].quantity;

    return total;
  }, 0);
};
