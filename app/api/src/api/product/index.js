const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /products?limit=1 Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiPermission admin,user
 * @apiBody {String} [name] Product's name.
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters or body may contain invalid values.
 * @apiError 401 Admin access only.
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
  celebrate({
    [Segments.BODY]: {
      name: Joi.string()
    }
  }),
  index
)

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission admin,user
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
 * @apiPermission admin,user
 * @apiBody {String} [name] Product's name.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.put(
  '/',
  celebrate({
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
 * @apiPermission admin,user
 * @apiBody {String} [name] Product's name.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 */
router.delete('/:id', destroy)

module.exports = router
