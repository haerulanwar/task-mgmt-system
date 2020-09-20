const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userValidator = require('../validations/userValidation')
const baseValidator = require('../validations/baseValidator')

router.post('/signup', [userValidator.required, baseValidator], userController.signUp)
router.post('/signin', [userValidator.required, baseValidator], userController.signIn)
router.post('/signout', userController.signOut)

module.exports = router
