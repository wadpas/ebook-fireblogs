const express = require('express')
const router = express.Router()
const { getBooks, createBook, getBook, updateBook, deleteBook, addBooks } = require('../controllers/books')

router.route('/').get(getBooks).post(createBook).put(addBooks)
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

module.exports = router
