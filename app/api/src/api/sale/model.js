const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')
const { Product } = require('../product/model')

const Sale = sequelize.define('sales', {})

const SalesProducts = sequelize.define(
  'salesProducts',
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id'
      }
    },
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Sale,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.JSONB()
    }
  },
  { timestamps: false }
)

Sale.belongsToMany(Product, {
  through: { model: SalesProducts }
})

Product.belongsToMany(Sale, {
  through: { model: SalesProducts }
})

module.exports = Sale
