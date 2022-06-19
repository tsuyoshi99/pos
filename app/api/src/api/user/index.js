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
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters or body may contain invalid values.
 * @apiError 401 need to login.
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
 * @apiBody {String} username User's username.
 * @apiBody {String{6..}} password User's password.
 * @apiBody {String} [name] User's name.
 * @apiBody {String} [image] User's profile picture.
 * @apiBody {String=user,admin} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 409 Username already registered.
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
 * @apiBody {String} [name] User's name.
 * @apiBody {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or need to login.
 * @apiError 404 User not found.
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
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 need to login.
 * @apiError 404 User not found.
 */
router.delete('/:id', destroy)

module.exports = router
