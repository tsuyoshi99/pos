const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /products?limit=1 Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {String} [name] Product's name.
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters or body may contain invalid values.
 * @apiError 401 user access only.
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
      }),
      [Segments.BODY]: {
        name: Joi.string()
      }
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
 * @apiBody {String} [name] Product's name.
 * @apiSuccess (Sucess 201) {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string()
    }
  }),
  create
)

/**
 * @api {put} /products/1 Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {String} [name] Product's name.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }),
    [Segments.BODY]: {
      name: Joi.string()
    }
  }),
  update
)

/**
 * @api {delete} /products/1 Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiBody {String} [name] Product's name.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 */
router.delete('/:id', destroy)

module.exports = router
