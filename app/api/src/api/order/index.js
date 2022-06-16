const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /orders?limit=1 Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiPermission admin,user
 * @apiBody {String} [name] Order's name.
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
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
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiPermission admin,user
 * @apiBody {String} [name] Order's name.
 * @apiSuccess (Sucess 201) {Object} order Order's data.
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
 * @api {put} /orders/1 Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission admin,user
 * @apiBody {String} [name] Order's name.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
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
 * @api {delete} /orders/1 Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission admin,user
 * @apiBody {String} [name] Order's name.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id', destroy)

module.exports = router
