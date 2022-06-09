const toDTO = (product) => {
  return {
    name: product.name,
    price: product.price,
    description: product.description,
  }
}

module.exports = { toDTO }
