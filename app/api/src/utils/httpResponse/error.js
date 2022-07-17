const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

const sequelizeValidationHandler = (res, error) => {
  // handle sequlize error
  res.status(400).send({
    name: error.message,
    description: error.errors.map((err) => ({ message: err.message }))
  })
}

module.exports = { notFound, sequelizeValidationHandler }
