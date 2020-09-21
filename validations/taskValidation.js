const { header, body } = require('express-validator')

const required = [
  header('Authorization', 'Authorization is required').not().isEmpty()
]

const add = [
  body('startTime', 'startTime is required').not().isEmpty(),
  body('eventTask', 'taskEvent is required').not().isEmpty()
]

module.exports = {
  required,
  add
}
