const responseBuild = require('../builders/response')
const config = require('../config/config.json')
const { encodePassword } = require('../builders/cryptoUtil')
const { user } = require('../models')

module.exports = {
  signUp (req, res, next) {
    const { username, password } = req.body
    const secKey = Buffer.from(config.secret, 'base64').toString('utf8')
    const encPassword = encodePassword(password, secKey)

    user.create({ username, password: encPassword }).then(user => {
      responseBuild.created(res, 'Success to register', user)
    }).catch(err => {
      responseBuild.badRequest(res, err.message, err)
    })
  },
  signIn (req, res, next) {
    res.send('on dev')
  },
  signOut (req, res, next) {
    res.send('on dev')
  }
}
