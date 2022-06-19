const User = require('../../src/api/user/model')

const createUser = async (userData) => {
  const user = await User.create(userData)
  return user
}

module.exports = { createUser }
