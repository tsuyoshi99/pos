const { ValidationError } = require('sequelize')

const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

const validationError = (res) => (error) => {
  // handle sequlize error
  if (error instanceof ValidationError) {
    res.status(400).send({
      name: error.message,
      description: error.errors.map((err) => ({ message: err.message }))
    })

    return
  }

  throw error
}

module.exports = { notFound, validationError }
