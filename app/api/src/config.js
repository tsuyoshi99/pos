const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  postgresUrl: process.env.POSTGRES_URL,
  jwtSecret: process.env.JWT_SECRET,
  publicUri: process.env.PUBLIC_URI,
  salt: parseInt(process.env.SALT)
}

module.exports = { config }
