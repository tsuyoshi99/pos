const { HttpError } = require('../utils/httpError')
const core = require('core')

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      next(new Error('something wrong, req.user must be here'))
    }

    if (typeof roles === 'string') {
      if (req.user.role === roles) {
        next()
        return
      }

      next(new HttpError(403, core.error.forbidden))
      return
    }

    if (Array.isArray(roles)) {
      if (roles.includes(req.user.role)) {
        next()
        return
      }

      next(new HttpError(403, core.error.forbidden))
    }

    next(new HttpError(403, core.error.forbidden))
  }
}

module.exports = { checkRole }
