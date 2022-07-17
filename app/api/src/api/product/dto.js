const core = require('core')
const toDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price),
    quantity: parseFloat(product.inventory.quantity),
    inventory: core.product.toMultiLevel(
      product.forms,
      product.inventory.quantity
    )
  }
}

module.exports = { toDTO }
