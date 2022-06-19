const Product = require('../../src/api/product/model')

const createProduct = async (productData) => {
  const product = await Product.create(productData)
  return product
}

module.exports = { createProduct }
