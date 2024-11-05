const Book = require('../models/book')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getBooks = async (req, res) => {
	const { limit = 12, page = 1, sort = -1 } = req.query
	const books = await Book.find()
		.limit(limit)
		.skip(limit * (page - 1))
		.sort({ released: sort })

	res.status(StatusCodes.OK).json({ books, count: books.length })
}

const getBook = async (req, res) => {
	const { id } = req.params
	const movie = await Book.findById({ _id: id })
	if (!movie) {
		throw new NotFoundError(`No forum with id ${id}`)
	}
	res.status(StatusCodes.OK).json(movie)
}

const createBook = async (req, res) => {
	req.body.createdBy = req.user.userId
	const forum = await Book.create(req.body)
	res.status(StatusCodes.CREATED).json({ forum })
}

const updateBook = async (req, res) => {
	const {
		body: { description, name },
		params: { id: forumId },
		user: { userId },
	} = req
	if (description === '' || name === '') {
		throw new BadRequestError('Description and name fields cannot be empty')
	}
	const forum = await Book.findOneAndUpdate({ _id: forumId, createdBy: userId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).json({ forum })
}

const deleteBook = async (req, res) => {
	const {
		user: { userId },
		params: { id: forumId },
	} = req
	const forum = await Book.findOneAndDelete({ _id: forumId, createdBy: userId })
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).send()
}

const addBooks = async (req, res) => {
	await Book.deleteMany({})
	const books = await Book.insertMany(req.body)
	res.status(StatusCodes.CREATED).json({ books, count: books.length })
}

module.exports = {
	getBooks,
	createBook,
	getBook,
	updateBook,
	deleteBook,
	addBooks,
}
