const express = require('express')
const router = express.Router()
const { getBooks, createForum, getBook, updateForum, deleteForum } = require('../controllers/books')

router.route('/').get(getBooks).post(createForum)
router.route('/:id').get(getBook).patch(updateForum).delete(deleteForum)

module.exports = router
