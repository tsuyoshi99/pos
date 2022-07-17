const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')
const core = require('core')

const router = new Router()

/**
 * @api {get} /products?limit=1 Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {string} name
 * @apiBody {string} description
 * @apiBody {Number} price
 * @apiBody {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiBody {Object} inventory example: {quantity: number}
 * @apiUse listParams
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {string} name
 * @apiSuccess (200) {string} description
 * @apiSuccess (200) {string} price
 * @apiSuccess (200) {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiSuccess (200) {Object} inventory example: {quantity: number}
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 */
router.get(
  '/',
  celebrate(
    {
      [Segments.QUERY]: Joi.object({
        filter: Joi.string(),
        order: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
      })
    },
    { abortEarly: false }
  ),
  index
)

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {string} name
 * @apiBody {string} description
 * @apiBody {Number} price
 * @apiBody {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiBody {Object} inventory example: {quantity: number}
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {string} name
 * @apiSuccess (200) {string} description
 * @apiSuccess (200) {string} price
 * @apiSuccess (200) {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiSuccess (200) {Object} inventory example: {quantity: number}
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: core.product.validation.create
  }),
  create
)

/**
 * @api {put} /products/1 Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {string} name
 * @apiBody {string} description
 * @apiBody {Number} price
 * @apiBody {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiBody {Object} inventory example: {quantity: number}
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {string} name
 * @apiSuccess (200) {string} description
 * @apiSuccess (200) {string} price
 * @apiSuccess (200) {Array} forms example: [{coefficient: number, name: string, price: number}]
 * @apiSuccess (200) {Object} inventory example: {quantity: number}
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 * @apiError (404) NotFound maybe wrong id ?.
 */
router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }),
    [Segments.BODY]: core.product.validation.update
  }),
  update
)

/**
 * @api {delete} /products/1 Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiSuccess (204) Success No Content
 * @apiError (404) NotFound Not found
 */
router.delete('/:id', destroy)

module.exports = router
