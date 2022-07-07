const { success } = require('../../utils/httpResponse')
const { toDTO } = require('../user/dto')
const User = require('../user/model')

const index = async ({ user }, res, next) => {
  try {
    const result = await User.findOne({ id: user.id })
    return success(res)({
      data: toDTO(result)
    })
  } catch (error) {
    return next(error)
  }
}

const update = ({ body, user }, res, next) =>
  User.update(body, { where: { id: user.id }, returning: true })
    .then(([_, [profile]]) => {
      return { data: toDTO(profile) }
    })
    .then(success(res))
    .catch(next)

module.exports = { index, update }
