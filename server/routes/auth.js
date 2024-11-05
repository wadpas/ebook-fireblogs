const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/auth')
const { uploadProductImage } = require('../controllers/upload')

router.post('/login', login)
router.post('/register', register)
router.route('/uploads').post(uploadProductImage)

module.exports = router
