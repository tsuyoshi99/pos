const toDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    forms: product.forms.map((form) => {
      return {
        name: form.name,
        coefficient: form.coefficient,
        price: parseFloat(form.price)
      }
    }),
    inventory: { quantity: parseFloat(product.inventory.quantity) }
  }
}

module.exports = { toDTO }
