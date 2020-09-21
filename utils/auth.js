const config = require('../config/config.json')
const jwt = require('jsonwebtoken')
const responseBuild = require('../utils/response')

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization // Express headers are auto converted to lowercase

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  } else {
    return responseBuild.unauthorised(res, 'Token not provided')
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return responseBuild.unauthorised(res, 'Failed to validate token', err)
      } else {
        req.locals = { userId: decoded.userId }
        next()
      }
    })
  }
}
