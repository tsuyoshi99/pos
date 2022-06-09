const passport = require('passport')
const bcrypt = require('bcrypt')
const { config } = require('../../config')
const { HttpError } = require('../../utils/httpError')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../api/user/model')

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async function verify(email, password, done) {
      try {
        const user = await User.scope('admin').findOne({ where: { email } })

        if (!user) {
          return done(
            new HttpError(400, appError.incorrectEmailPassword),
            false
          )
        }

        if (!user.password) {
          return done(new HttpError(400, appError.userNoPassword), false)
        }

        const passwordMatched = bcrypt.compareSync(password, user.password)
        if (!passwordMatched) {
          return done(
            new HttpError(400, appError.incorrectEmailPassword),
            false
          )
        }

        return done(null, user)
      } catch (err) {
        if (err) {
          return done(err)
        }
      }
    }
  )
)

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async function verify(email, password, done) {
      try {
        const user = await User.count({ where: { email } })
        if (user) {
          return done(new HttpError(400, appError.userAlreadyExist), false)
        }

        const hashedPassword = bcrypt.hashSync(password, config.salt)

        const registeredUser = await User.create({
          email,
          password: hashedPassword
        })

        return done(null, registeredUser)
      } catch (error) {
        return done(error)
      }
    }
  )
)
