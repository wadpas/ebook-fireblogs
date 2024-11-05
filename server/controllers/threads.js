const Thread = require('../models/thread')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getThreads = async (req, res) => {
	const threads = await Thread.find(req.query).sort('createdAt')
	res.status(StatusCodes.OK).json({ threads, count: threads.length })
}

const getThread = async (req, res) => {
	const { id: threadId } = req.params
	const thread = await Thread.findById({ _id: threadId })
	if (!thread) {
		throw new NotFoundError(`No thread with id ${threadId}`)
	}
	res.status(StatusCodes.OK).json({ thread })
}

const createThread = async (req, res) => {
	req.body.userId = req.user.userId
	const thread = await Thread.create(req.body)
	res.status(StatusCodes.CREATED).json({ thread })
}

const updateThread = async (req, res) => {
	console.log(req.params)

	const {
		body: { title },
		params: { id: threadId },
	} = req
	if (title === '') {
		throw new BadRequestError('Title field cannot be empty')
	}
	const thread = await Thread.findOneAndUpdate({ _id: threadId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!thread) {
		throw new NotFoundError(`No thread with id ${threadId}`)
	}
	res.status(StatusCodes.OK).json({ thread })
}

const deleteThread = async (req, res) => {
	const {
		user: { userId },
		params: { id: threadId },
	} = req
	const thread = await Thread.findOneAndDelete({ _id: threadId, userId })
	if (!thread) {
		throw new NotFoundError(`No thread with id ${threadId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getThreads,
	createThread,
	getThread,
	updateThread,
	deleteThread,
}
