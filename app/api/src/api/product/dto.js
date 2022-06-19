const toDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    forms: product.forms,
    inventory: { quantity: product.inventory.quantity }
  }
}

module.exports = { toDTO }
