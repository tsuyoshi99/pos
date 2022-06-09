const { config } = require('./config')
const app = require('./services/express')
const api = require('./api')
const sequelize = require('./services/sequelize')
const { createLightship } = require('lightship')
const errorHandler = require('./middlewares/errorHandler')

;(async () => {
  const configuration = {}
  const lightship = await createLightship(configuration)
  sequelize.sync({ force: true })

  app.use(api)

  app.use(errorHandler)

  const server = app.listen(config.port, () => {
    lightship.signalReady()
  })

  lightship.registerShutdownHandler(async () => {
    server.close()
    await sequelize.close()
  })
})()
