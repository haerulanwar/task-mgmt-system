const responseBuild = require('../utils/response')
const { task, Op } = require('../models')

module.exports = {
  add (req, res, next) {
    const { startTime, endTime, location, eventTask } = req.body
    const userId = req.locals.userId

    task.create({ startTime, endTime, location, eventTask, userId }).then(resp => {
      responseBuild.created(res, 'Success to create task', resp)
    }).catch(err => {
      responseBuild.badRequest(res, err.message, err)
    })
  },
  list (req, res, next) {
    const { startTime, location } = req.query
    const userId = req.locals.userId
    const where = { userId: userId }
    const conWhere = {}

    if (startTime) {
      conWhere.startTime = startTime
    }
    if (location) {
      conWhere.location = location
    }

    if (startTime || location) {
      const conditionSymbol = Op.or
      where[conditionSymbol] = [conWhere]
    }

    task.findAll({ where }).then(resp => {
      if (resp.length > 0) {
        responseBuild.ok(res, 'Success', resp)
      } else {
        responseBuild.notFound(res, 'Not found')
      }
    }).catch(err => {
      responseBuild.badRequest(res, err.message, err)
    })
  }
}
