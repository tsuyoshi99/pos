const passport = require('passport')
const User = require('../api/user/model')
const { config } = require('../config')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {cookieExtractor} = require('../utils/jwt')
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor()
  ]),
  secretOrKey: config.jwtSecret
}

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk({ id: jwtPayload.sub })

      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      return done(err, false)
    }
  })
)
