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
  }
})

module.exports = Product
