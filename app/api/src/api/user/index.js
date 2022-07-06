const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /users?limit=1 Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess (201) {string} name
 * @apiSuccess (201) {string} email
 * @apiSuccess (201) {string} image
 * @apiSuccess (201) {string} role
 * @apiSuccess (201) {string} createdAt
 * @apiSuccess (201) {string} updatedAt
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
      }),
      [Segments.BODY]: Joi.object({
        name: Joi.string()
      }).unknown()
    },
    { abortEarly: false }
  ),
  index
)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission admin
 * @apiBody {string} name
 * @apiBody {string} email
 * @apiBody {string} image
 * @apiBody {string} role
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
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().max(255),
      role: Joi.string().allow('OWNER').required()
    }
  }),
  create
)

/**
 * @api {put} /users/1 Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiBody {string} name
 * @apiBody {string} email
 * @apiBody {string} image
 * @apiBody {string} role
 * @apiSuccess (200) {string} name
 * @apiSuccess (200) {string} email
 * @apiSuccess (200) {string} image
 * @apiSuccess (200) {string} role
 * @apiSuccess (200) {string} createdAt
 * @apiSuccess (200) {string} updatedAt
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (409) Conflict email already registered.
 * @apiError (401) Unauthorized need to login first
 * @apiError (404) NotFound not found.
 */
router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }),
    [Segments.BODY]: {
      email: Joi.string().email(),
      name: Joi.string().max(255),
      role: Joi.string().allow('OWNER')
    }
  }),
  update
)

/**
 * @api {delete} /users/1 Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiSuccess (204) Success No Content
 * @apiError (404) NotFound Not found
 */
router.delete('/:id', destroy)

module.exports = router
