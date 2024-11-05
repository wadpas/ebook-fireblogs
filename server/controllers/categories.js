const Category = require('../models/category')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getCategories = async (req, res) => {
	const categories = await Category.find({}).sort('createdAt')
	res.status(StatusCodes.OK).json({ categories, count: categories.length })
}

const getCategory = async (req, res) => {
	const { id: categoryId } = req.params
	const category = await Category.findById({ _id: categoryId })
	if (!category) {
		throw new NotFoundError(`No forum with id ${categoryId}`)
	}
	res.status(StatusCodes.OK).json({ category })
}

const createCategory = async (req, res) => {
	req.body.createdBy = req.user.userId
	const category = await Category.create(req.body)
	res.status(StatusCodes.CREATED).json({ category })
}

const updateCategory = async (req, res) => {
	const {
		body: { name },
		params: { id: categoryId },
		user: { userId },
	} = req
	if (name === '') {
		throw new BadRequestError('Name field cannot be empty')
	}
	const category = await Category.findOneAndUpdate({ _id: categoryId, createdBy: userId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!category) {
		throw new NotFoundError(`No category with id ${categoryId}`)
	}
	res.status(StatusCodes.OK).json({ category })
}

const deleteCategory = async (req, res, next) => {
	const {
		user: { userId },
		params: { id: categoryId },
	} = req
	const category = await Category.findOneAndDelete({ _id: categoryId, createdBy: userId })
	if (!category) {
		throw new NotFoundError(`No category with id ${categoryId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
}
