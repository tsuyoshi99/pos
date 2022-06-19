const User = require('../../src/api/user/model')
const bcrypt = require('bcrypt')
const { config } = require('../../src/config')
const { signJwt } = require('../../src/utils/jwt')

const generateToken = async (payload) => {
  return signJwt({ id: payload.id, role: payload.role })
}

const registerUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, config.salt)
  const user = await User.create({ ...userData, password: hashedPassword })
  return user
}

module.exports = { registerUser, generateToken }
