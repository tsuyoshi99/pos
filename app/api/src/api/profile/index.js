const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { index, update } = require('./controller')

const router = new Router()

/**
 * @api {get} /profile Retrieve profiles
 * @apiName RetrieveProfile
 * @apiGroup Profile
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess (201) {string} name
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 */
router.get('/', index)

/**
 * @api {put} /profiles/1 Update profile
 * @apiName UpdateProfile
 * @apiGroup Profile
 * @apiPermission user
 * @apiBody {String} name
 * @apiSuccess (201) {string} name
 * @apiSuccess (201) {string} email
 * @apiSuccess (201) {string} image
 * @apiSuccess (201) {string} role
 * @apiSuccess (201) {string} createdAt
 * @apiSuccess (201) {string} updatedAt
 * @apiError (400) BadRequest Some parameters or body may contain invalid values.
 * @apiError (401) Unauthorized user access only.
 */
router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
    }
  }),
  update
)

module.exports = router
