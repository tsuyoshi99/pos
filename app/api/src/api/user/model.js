const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const User = sequelize.define(
  'User',
  {
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
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'role'] }
    },
    scopes: {
      admin: {
        attributes: { include: ['password', 'role'] }
      }
    }
  }
)

User.associate = function (models) {
  // associations can be defined here
}

module.exports = User
