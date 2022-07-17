const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, destroy } = require('./controller')
const core = require('core')

const router = new Router()

/**
 * @api {get} /sales?limit=1 Retrieve sales
 * @apiName RetrieveSales
 * @apiGroup Sale
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {Number} total calculated total
 * @apiSuccess (200) {Number} userId user that create the sale
 * @apiSuccess (200) {Array} items Example: [{id: string, name: string, description: string, price: number, quantity: number}]
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
 * @api {post} /sales Create sale
 * @apiName CreateSale
 * @apiGroup Sale
 * @apiPermission user
 * @apiBody {Number} id
 * @apiBody {Number} total calculated total
 * @apiBody {Number} userId user that create the sale
 * @apiBody {Array} items Example: [{id: string, name: string, description: string, price: number, quantity: number}]
 * @apiSuccess (200) {Number} id
 * @apiSuccess (200) {Number} total calculated total
 * @apiSuccess (200) {Number} userId user that create the sale
 * @apiSuccess (200) {Array} items Example: [{id: string, name: string, description: string, price: number, quantity: number}]
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: core.sale.validation.create
  }),
  create
)

/**
 * @api {delete} /sales/1 Delete sale
 * @apiName DeleteSale
 * @apiGroup Sale
 * @apiPermission user
 * @apiSuccess (204) Success No Content
 * @apiError (404) NotFound Not found
 */
router.delete('/:id', destroy)

module.exports = router
