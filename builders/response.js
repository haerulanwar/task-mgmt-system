'use strict'

function sendResponse (res, code, message, data, error) {
  res.status(code)
  const result = { message: message }
  if (data) {
    result.data = data
  }
  if (error) {
    result.error = error
  }
  res.json(result)
}

module.exports = {
  ok: function (res, message, data) {
    sendResponse(res, 200, message, data)
  },
  created: function (res, message, data) {
    sendResponse(res, 201, message, data)
  },
  badRequest: function (res, message, err) {
    let code = 400
    let msg = message
    if (message.code) {
      code = message.code
      msg = message.message
    }
    sendResponse(res, code, msg, null, err)
  },
  notFound: function (res, message, err) {
    sendResponse(res, 404, message, null, err)
  }
}
