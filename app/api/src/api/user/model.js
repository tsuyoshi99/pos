const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
})

module.exports = User
