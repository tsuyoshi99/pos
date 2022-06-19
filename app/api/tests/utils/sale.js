const Sale = require('../../src/api/sale/model')

const createSale = async (saleData) => {
  const sale = await Sale.create(saleData)
  return sale
}

module.exports = { createSale }
