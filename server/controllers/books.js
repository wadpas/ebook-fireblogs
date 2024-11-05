const Forum = require('../models/forum')
const Book = require('../models/book')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getBooks = async (req, res) => {
	const { year = 2015, limit = 12, page = 1, sort = -1 } = req.query
	const movies = await Book.find({ year: year })
		.limit(limit)
		.skip(limit * (page - 1))
		.sort({ released: sort })

	res.status(StatusCodes.OK).json({ movies, count: movies.length })
}

const getBook = async (req, res) => {
	const { id } = req.params
	const movie = await Book.findById({ _id: id })
	if (!movie) {
		throw new NotFoundError(`No forum with id ${id}`)
	}
	res.status(StatusCodes.OK).json(movie)
}

const createForum = async (req, res) => {
	req.body.createdBy = req.user.userId
	const forum = await Forum.create(req.body)
	res.status(StatusCodes.CREATED).json({ forum })
}

const updateForum = async (req, res) => {
	const {
		body: { description, name },
		params: { id: forumId },
		user: { userId },
	} = req
	if (description === '' || name === '') {
		throw new BadRequestError('Description and name fields cannot be empty')
	}
	const forum = await Forum.findOneAndUpdate({ _id: forumId, createdBy: userId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).json({ forum })
}

const deleteForum = async (req, res) => {
	const {
		user: { userId },
		params: { id: forumId },
	} = req
	const forum = await Forum.findOneAndDelete({ _id: forumId, createdBy: userId })
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).send()
}

const addBooks = async (req, res) => {
	const books = await Book.insertMany(req.body)
	res.status(StatusCodes.CREATED).json({ books, count: books.length })
}

module.exports = {
	getBooks,
	createForum,
	getBook,
	updateForum,
	deleteForum,
	addBooks,
}
