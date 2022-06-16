const toDTO = (order) => {
  return {
    name: order.name
  }
}

const toDatabase = (order) => {
  return {
    name: order.name
  }
}

module.exports = { toDTO, toDatabase }
