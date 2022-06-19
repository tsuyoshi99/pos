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
    price: { type: DataTypes.DECIMAL(12, 2) },
    quantity: { type: DataTypes.DECIMAL(12, 2) }
  },
  { timestamps: false }
)

Sale.belongsToMany(Product, { through: SalesProducts })
Product.belongsToMany(Sale, { through: SalesProducts })

module.exports = Sale
