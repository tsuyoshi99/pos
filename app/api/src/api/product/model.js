const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING
  }
})

module.exports = Product
