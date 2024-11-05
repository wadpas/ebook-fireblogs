const express = require('express')
const router = express.Router()
const { getHeros, createHero, getHero, updateHero, deleteHero } = require('../controllers/heros')

router.route('/').get(getHeros).post(createHero)
router.route('/:id').get(getHero).patch(updateHero).delete(deleteHero)

module.exports = router
