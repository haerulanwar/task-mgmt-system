const responseBuild = require('../builders/response')
const config = require('../config/config.json')
const { encodePassword, decodePassword } = require('../builders/cryptoUtil')
const { user } = require('../models')
const jwt = require('jsonwebtoken')

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
    const { username, password } = req.body
    user.findOne({
      where: {
        username: username
      }
    }).then(u => {
      if (typeof u === 'undefined' || u === null) {
        return responseBuild.notFound(res, 'User not found', '')
      }

      const secKey = Buffer.from(config.secret, 'base64').toString('utf8')
      const decPassword = decodePassword(u.password, secKey)
      if (decPassword === password) {
        const token = jwt.sign({ 
          userId: u.id,
          username: u.username
        },
          config.secret,
          {
            expiresIn: '1h' // expires in 24 hours
          }
        )
        responseBuild.ok(res, 'Success to login', {
          message: 'Authentication successful!',
          token: token
        })
      } else {
        responseBuild.unauthorised(res, 'Incorrect password', '')
      }
    }).catch(err => {
      responseBuild.badRequest(res, err.message, err)
    })
  },
  signOut (req, res, next) {
    responseBuild.ok(res, 'Success to logout')
  }
}
