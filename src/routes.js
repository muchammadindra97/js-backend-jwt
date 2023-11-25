const express = require('express')
const authController = require('./controllers/authController')
const resourceController = require('./controllers/resourceController')

const router = express.Router()

router.use('/auth', authController)
router.use('/resource', resourceController)

module.exports = router
