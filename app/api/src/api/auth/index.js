const { Joi, celebrate, Segments } = require('celebrate')
const { Router } = require('express')
const passport = require('passport')
const { signJwt } = require('../../utils/jwt')
const { toDTO } = require('../user/dto')
require('./passport')

const router = new Router()

/**
 * @api {post} /login Login to existing user
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission user
 * @apiBody {String} email User's email.
 * @apiBody {String{6..}} password User's password.
 * @apiSuccess (Sucess 200) {Object} user User's data.
 * @apiError {Object} 400 Some body may contain invalid values.
 */
router.post(
  '/login',
  celebrate(
    {
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().max(200).required(),
        password: Joi.string().min(8).max(300).required()
      })
    },
    { abortEarly: false }
  ),
  function (req, res, next) {
    passport.authenticate('login', function (err, user) {
      if (err) {
        return next(err)
      }

      const token = signJwt(user)

      return res.cookie('accessToken', token).json({ data: toDTO(user) })
    })(req, res, next)
  }
)

/**
 * @api {post} /register Register new user
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission user
 * @apiBody {String} email User's email.
 * @apiBody {String{6..}} password User's password.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 409 Username already registered.
 */
router.post(
  '/register',
  celebrate(
    {
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
      })
    },
    { abortEarly: false }
  ),
  function (req, res, next) {
    passport.authenticate('register', function (err, user) {
      if (err) {
        return next(err)
      }

      const token = signJwt(user)

      return res.cookie('accessToken', token).json({ data: toDTO(user) })
    })(req, res, next)
  }
)

module.exports = router
