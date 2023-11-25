const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = express.Router()

router.get('/admin', jwtMiddleware(['admin']), (req, res) => {
  res.json({
    status: 'success',
    message: 'Admin content'
  })
})

router.get('/moderator', jwtMiddleware(['moderator']), (req, res) => {
  res.json({
    status: 'success',
    message: 'Moderator content'
  })
})

router.get('/user', jwtMiddleware(['user']), (req, res) => {
  res.json({
    status: 'success',
    message: 'User content'
  })
})

router.get('/all-role', jwtMiddleware(), (req, res) => {
  res.json({
    status: 'success',
    message: 'All role content'
  })
})

router.get('/public', (req, res) => {
  res.json({
    status: 'success',
    message: 'Public content'
  })
})

module.exports = router
