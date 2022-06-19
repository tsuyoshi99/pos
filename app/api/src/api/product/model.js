const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL(12, 2)
  },
  forms: {
    type: DataTypes.JSONB()
  }
})

const Inventory = sequelize.define(
  'inventories',
  {
    quantity: {
      type: DataTypes.DECIMAL(12, 2)
    }
  },
  { timestamps: false }
)

Product.hasOne(Inventory)
Inventory.belongsTo(Product)

module.exports = { Product, Inventory }
