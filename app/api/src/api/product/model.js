const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL(12, 2)
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
})

Product.associate = function (models) {
  // associations can be defined here
}

module.exports = Product
