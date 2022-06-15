const { isCelebrateError } = require('celebrate')
const { logger } = require('../services/logger')
const { HttpError } = require('../utils/httpError')

const errorHandler = (err, _, res, next) => {
  if (err instanceof HttpError) {
    logger.warn(err)
    res.status(err.status)
    res.json({
      error: {
        message: err.message,
        details: err.details
      }
    })

    return next()
  }

  if (isCelebrateError(err)) {
    logger.warn(err)
    res.status(400)
    const obj = {}
    for (const [key, value] of err.details) {
      obj[key] = value.details.map((detail) => detail.message)
    }
    res.json({
      error: {
        message: err.message,
        details: obj
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
