const { Router } = require('express')
const user = require('./user')
const auth = require('./auth')
const product = require('./product')
const sale = require('./sale')
const passport = require('passport')
const profile = require('./profile')

// this is important
require('../middlewares/authorization')

const router = new Router()

/**
 * @apiDefine user User access only
 * You must pass `access_token` a Bearer Token authorization header
 * to access this endpoint.
 *
 * @apiDefine listParams
 * @apiParam {string} [fields] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {string} [sort=name:asc] Order of returned items.
 */
router.use('/auth', auth)
router.use('/users', passport.authenticate('jwt', { session: false }), user)
router.use(
  '/products',
  passport.authenticate('jwt', { session: false }),
  product
)
router.use('/sales', passport.authenticate('jwt', { session: false }), sale)
router.use(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  profile
)

module.exports = router
