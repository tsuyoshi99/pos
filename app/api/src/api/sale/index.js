const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /sales?limit=1 Retrieve sales
 * @apiName RetrieveSales
 * @apiGroup Sale
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Object[]} sales List of sales.
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
 * @apiSuccess (Sucess 201) {Object} sale Sale's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      items: Joi.array().items(
        Joi.object({
          id: Joi.number().integer().required(),
          quantity: Joi.number().required(),
          price: Joi.number().required()
        })
      )
    }
  }),
  create
)

/**
 * @api {delete} /sales/1 Delete sale
 * @apiName DeleteSale
 * @apiGroup Sale
 * @apiPermission user
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Sale not found.
 */
router.delete('/:id', destroy)

module.exports = router
