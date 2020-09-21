const { validationResult } = require('express-validator')
const responseBuild = require('../utils/response')

module.exports = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return responseBuild.badRequest(res, 'Validation failed', errors.array())
  }

  next()
}
