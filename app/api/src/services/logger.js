const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json({})
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.json()
    })
  ]
})

module.exports = { logger }
