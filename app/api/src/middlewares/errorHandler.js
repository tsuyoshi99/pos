const { isCelebrateError } = require('celebrate')
const { ValidationError } = require('sequelize')
const { logger } = require('../services/logger')
const { HttpError } = require('../utils/httpError')
const { sequelizeValidationHandler } = require('../utils/httpResponse')

const errorHandler = (err, _, res, next) => {
  if (err instanceof HttpError) {
    logger.warn(err)
    res.status(err.status)
    res.json({
      error: {
        name: err.message,
        description: err.details
      }
    })

    return next()
  }

  if (err instanceof ValidationError) {
    sequelizeValidationHandler(res, err)
    return next()
  }

  if (isCelebrateError(err)) {
    res.status(400)
    const obj = {}
    for (const [key, value] of err.details) {
      obj[key] = value.details.map((detail) => detail.message)
    }
    err.details = obj
    logger.warn(err)
    res.json({
      error: {
        message: err.message,
        details: obj
      }
    })

    return next()
  }

  if (err instanceof SyntaxError) {
    logger.warn(err)
    res.status(err.status)
    res.json({
      error: {
        name: err.message,
        description: err.details
      }
    })

    return next()
  }

  logger.error(err)

  res.status(500)
  res.json({
    errors: {
      message: 'Unknown Error'
    }
  })

  next()
}

module.exports = errorHandler
