const express = require('express')
const router = express.Router()
const taskController = require('../controller/taskController')
const taskValidation = require('../validations/taskValidation')
const baseValidator = require('../validations/baseValidator')
const auth = require('../utils/auth')

router.post('/add', [taskValidation.required, taskValidation.add, baseValidator, auth], taskController.add)
router.get('/list', [taskValidation.required, baseValidator, auth], taskController.list)

module.exports = router
