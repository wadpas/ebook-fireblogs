const Post = require('../models/post')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getPosts = async (req, res) => {
	const posts = await Post.find(req.query).sort('createdAt')
	res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

const getPost = async (req, res) => {
	const { id: postId } = req.params
	const post = await Post.findById({ _id: postId })
	if (!post) {
		throw new NotFoundError(`No post with id ${postId}`)
	}
	res.status(StatusCodes.OK).json({ post })
}

const createPost = async (req, res) => {
	req.body.userId = req.user.userId
	const post = await Post.create(req.body)
	res.status(StatusCodes.CREATED).json({ post })
}

const updatePost = async (req, res, next) => {
	const {
		body: { text },
		params: { id: postId },
		user: { userId },
	} = req
	if (text === '') {
		throw new BadRequestError('Text field cannot be empty')
	}
	const post = await Post.findOneAndUpdate({ _id: postId, userId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!post) {
		throw new NotFoundError(`No post with id ${postId}`)
	}
	res.status(StatusCodes.OK).json({ post })
}

const deletePost = async (req, res, next) => {
	const {
		user: { userId },
		params: { id: postId },
	} = req
	const post = await Post.findOneAndDelete({ _id: postId, userId })
	if (!post) {
		throw new NotFoundError(`No thread with id ${postId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
}
