const { Product, Inventory } = require('../../src/api/product/model')

const createProduct = async (productData) => {
  const product = await Product.create(
    { ...productData, inventory: { quantity: productData.inventory.quantity } },
    { include: [Inventory] }
  )
  return product
}

module.exports = { createProduct }
