const express = require('express')
const router = express.Router()
const {
	getBanners,
	createBanner,
	getBanner,
	updateBanner,
	deleteBanner,
	addBanners,
} = require('../controllers/banners')

router.route('/').get(getBanners).post(createBanner).put(addBanners)
router.route('/:id').get(getBanner).patch(updateBanner).delete(deleteBanner)

module.exports = router
