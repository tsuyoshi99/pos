const jwt = require('jsonwebtoken')
const { config } = require('../../config')
const { cookieExtractor } = require('./cookieExtractor')

const signJwt = (user) => {
  const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret)
  return token
}

module.exports = { signJwt, cookieExtractor }
