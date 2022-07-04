const { config } = require('./config')
const sequelize = require('./services/sequelize')
const { createLightship } = require('lightship')
const loadExpress = require('./services/express')

;(async () => {
  if (!process.env.ENV) {
    console.log('please provide env')
    return
  }

  const configuration = {}
  const lightship = await createLightship(configuration)

  const app = loadExpress()

  sequelize.sync({ force: true })

  const server = app.listen(config.port, () => {
    lightship.signalReady()
    console.log(`Running on port ${config.port}`)
  })

  lightship.registerShutdownHandler(async () => {
    server.close()
    await sequelize.close()
  })
})()
