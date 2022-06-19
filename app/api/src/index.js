const { config } = require('./config')
const sequelize = require('./services/sequelize')
const { createLightship } = require('lightship')
const loadExpress = require('./services/express')

;(async () => {
  const configuration = {}
  const lightship = await createLightship(configuration)

  const app = loadExpress()

  const server = app.listen(config.port, () => {
    lightship.signalReady()
  })

  lightship.registerShutdownHandler(async () => {
    server.close()
    await sequelize.close()
  })
})()
