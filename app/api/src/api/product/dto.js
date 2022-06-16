const toDTO = (product) => {
  return {
    name: product.name
  }
}

const toDatabase = (product) => {
  return {
    name: product.name
  }
}

module.exports = { toDTO, toDatabase }
