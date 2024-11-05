const Hero = require('../models/hero')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getHeros = async (req, res) => {
	const heros = await Hero.find(req.query).sort('createdAt')
	res.status(StatusCodes.OK).json({ heros, count: heros.length })
}

const getHero = async (req, res) => {
	const { id: heroId } = req.params
	const hero = await Hero.findById({ _id: heroId })
	if (!hero) {
		throw new NotFoundError(`No hero with id ${heroId}`)
	}
	res.status(StatusCodes.OK).json({ hero })
}

const createHero = async (req, res) => {
	req.body.userId = req.user.userId
	const hero = await Hero.create(req.body)
	res.status(StatusCodes.CREATED).json({ hero })
}

const updateHero = async (req, res) => {
	console.log(req.params)

	const {
		body: { title },
		params: { id: heroId },
	} = req
	if (title === '') {
		throw new BadRequestError('Title field cannot be empty')
	}
	const hero = await Hero.findOneAndUpdate({ _id: heroId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!hero) {
		throw new NotFoundError(`No hero with id ${heroId}`)
	}
	res.status(StatusCodes.OK).json({ hero })
}

const deleteHero = async (req, res) => {
	const {
		user: { userId },
		params: { id: heroId },
	} = req
	const hero = await Hero.findOneAndDelete({ _id: heroId, userId })
	if (!hero) {
		throw new NotFoundError(`No hero with id ${heroId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getHeros,
	createHero,
	getHero,
	updateHero,
	deleteHero,
}
