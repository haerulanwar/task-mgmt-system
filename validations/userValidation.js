const { body } = require('express-validator')

const required = [
  body('username', 'username is required').not().isEmpty().trim(),
  body('password', 'password is required').not().isEmpty().trim()
]

module.exports = {
  required
}
