const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const winston = require('winston')
const expressWinston = require('express-winston')
const { config } = require('../config')
const helmet = require('helmet')

const app = express()

app.use(helmet())
if (config.env === 'production') {
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      expressFormat: true,
      colorize: false
    })
  )
}
app.use(passport.initialize())
app.use(cookieParser())
app.use(express.json())
app.use(cors())

module.exports = app
