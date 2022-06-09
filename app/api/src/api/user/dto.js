const toDTO = (user) => {
  return {
    name: user.name,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

module.exports = { toDTO }
