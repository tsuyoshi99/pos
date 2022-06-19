const sequelize = require('../../src/services/sequelize')
const clearDatabase = () => {
  return sequelize.sync({ force: true })
}

module.exports = { clearDatabase }
