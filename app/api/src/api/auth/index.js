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
 * @apiBody {string} email User's email.
 * @apiBody {string{8..}} password User's password.
 * @apiSuccess (200) {string} name
 * @apiSuccess (200) {string} email
 * @apiSuccess (200) {string} image
 * @apiSuccess (200) {string} role
 * @apiSuccess (200) {string} createdAt
 * @apiSuccess (200) {string} updatedAt
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
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
 * @apiBody {string} email User's email.
 * @apiBody {string{8..}} password User's password.
 * @apiSuccess (201) {string} name
 * @apiSuccess (201) {string} email
 * @apiSuccess (201) {string} image
 * @apiSuccess (201) {string} role
 * @apiSuccess (201) {string} createdAt
 * @apiSuccess (201) {string} updatedAt
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (409) Conflict email already registered.
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
