const { Router } = require('express')
const user = require('./user')
const auth = require('./auth')
const product = require('./product')

const router = new Router()

/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` a Bearer Token authorization header
 * to access this endpoint.
 *
 * @apiDefine user User access only
 * You must pass `access_token` a Bearer Token authorization header
 * to access this endpoint.
 *
 * @apiDefine listParams
 * @apiParam {String} [fields] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String} [sortBy=createdAt] Order of returned items.
 * @apiParam {String} [orderBy=asc] Order of returned items.
 */
router.use('/auth', auth)
router.use('/users', user)
router.use('/products', product)

module.exports = router
