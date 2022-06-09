const { config } = require('../config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(config.postgresUrl, { logging: false })

module.exports = sequelize
