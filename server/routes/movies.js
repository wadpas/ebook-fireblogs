const express = require('express')
const router = express.Router()
const { getMovies, createForum, getMovie, updateForum, deleteForum } = require('../controllers/movies')

router.route('/').get(getMovies).post(createForum)
router.route('/:id').get(getMovie).patch(updateForum).delete(deleteForum)

module.exports = router
