const express = require('express')
const router = express.Router()
const authMid = require('../middleware/auth')
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/posts')

router.route('/').get(getPosts).post(authMid, createPost)
router.route('/:id').get(getPost).patch(authMid, updatePost).delete(deletePost)

module.exports = router
