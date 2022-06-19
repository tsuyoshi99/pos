const toDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: parseFloat(product.price)
  }
}

const toDatabase = (body) => {
  return {
    id: body.id,
    name: body.name,
    description: body.description,
    price: body.price
  }
}

module.exports = { toDTO, toDatabase }
