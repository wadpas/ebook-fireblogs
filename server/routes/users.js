const express = require('express')
const router = express.Router()
const authMid = require('../middleware/auth')
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')

router.route('/').get(getUsers)
router.route('/me').get(authMid, getUser).patch(authMid, updateUser)
router.route('/:id').patch(authMid, updateUser).delete(deleteUser)

module.exports = router
