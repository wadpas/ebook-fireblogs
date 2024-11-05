const Banner = require('../models/banner')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getBanners = async (req, res) => {
	const banners = await Banner.find({})
	res.status(StatusCodes.OK).json({ banners, count: banners.length })
}

const getBanner = async (req, res) => {
	const { id: bannerId } = req.params
	const banner = await Banner.findById({ _id: bannerId })
	if (!banner) {
		throw new NotFoundError(`No banner with id ${bannerId}`)
	}
	res.status(StatusCodes.OK).json({ banner })
}

const createBanner = async (req, res) => {
	req.body.userId = req.user.userId
	const banner = await Banner.create(req.body)
	res.status(StatusCodes.CREATED).json({ banner })
}

const updateBanner = async (req, res) => {
	console.log(req.params)

	const {
		body: { title },
		params: { id: bannerId },
	} = req
	if (title === '') {
		throw new BadRequestError('Title field cannot be empty')
	}
	const banner = await Banner.findOneAndUpdate({ _id: bannerId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!banner) {
		throw new NotFoundError(`No banner with id ${bannerId}`)
	}
	res.status(StatusCodes.OK).json({ banner })
}

const deleteBanner = async (req, res) => {
	const {
		user: { userId },
		params: { id: bannerId },
	} = req
	const banner = await Banner.findOneAndDelete({ _id: bannerId, userId })
	if (!banner) {
		throw new NotFoundError(`No banner with id ${bannerId}`)
	}
	res.status(StatusCodes.OK).send()
}

const addBanners = async (req, res) => {
	await Banner.deleteMany({})
	const banners = await Banner.insertMany(req.body)
	res.status(StatusCodes.CREATED).json({ banners, count: banners.length })
}

module.exports = {
	getBanners,
	createBanner,
	getBanner,
	updateBanner,
	deleteBanner,
	addBanners,
}
