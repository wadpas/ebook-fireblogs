const express = require('express')
const router = express.Router()
const authMid = require('../middleware/auth')
const { getThreads, createThread, getThread, updateThread, deleteThread } = require('../controllers/threads')

router.route('/').get(getThreads).post(authMid, createThread)
router.route('/:id').get(getThread).patch(authMid, updateThread).delete(deleteThread)

module.exports = router
