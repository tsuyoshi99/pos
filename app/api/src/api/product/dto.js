const toDTO = (product) => {
  return {
    id: product.id,
    name: product.name
  }
}

const toDatabase = (product) => {
  return {
    id: product.id,
    name: product.name
  }
}

module.exports = { toDTO, toDatabase }
