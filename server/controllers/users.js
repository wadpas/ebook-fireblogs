const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getUsers = async (req, res) => {
	const { usersIds } = req.query
	const users = await User.find({ _id: { $in: usersIds } })
	res.status(StatusCodes.OK).json({ users, count: users.length })
}

const getUser = async (req, res) => {
	const {
		user: { userId },
	} = req
	console.log(userId)

	const user = await User.findById({ _id: userId })
	if (!user) {
		throw new NotFoundError(`No user with id ${userId}`)
	}
	res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
	const {
		body: { email, name, username },
		user: { userId },
	} = req

	console.log(userId)

	if (email === '' || name === '' || username === '') {
		throw new BadRequestError('Email, name, and username fields cannot be empty')
	}
	const user = await User.findOneAndUpdate({ _id: userId }, { ...req.body }, { new: true, runValidation: true })
	if (!user) {
		throw new NotFoundError(`No user with id ${threadId}`)
	}
	res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
	const { userId } = req.user
	const user = await User.findOneAndDelete({ _id: userId })
	if (!user) {
		throw new NotFoundError(`No user with id ${userId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
}
// await User.insertMany(
// 	users.map((user) => ({
// 		avatar: user.avatar,
// 		email: user.email,
// 		lastVisitAt: moment(user.lastVisitAt * 1050).format(),
// 		name: user.name,
// 		isModerator: user.isModerator,
// 		registeredAt: moment(user.registeredAt * 1050).format(),
// 		username: user.username,
// 		usernameLower: user.usernameLower,
// 		_id: new mongoose.Types.ObjectId(user._id?.slice(16)),
// 		postsCount: user.postsCount,
// 		threads: user.threads?.map((th) => new mongoose.Types.ObjectId(th.slice(8))),
// 	}))
// )
