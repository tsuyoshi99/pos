const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')
const Product = require('../product/model')

const Order = sequelize.define('orders', {
  name: {
    type: DataTypes.STRING
  }
})

Order.belongsToMany(Product)
Product.belongsToMany(Order)

module.exports = Order
