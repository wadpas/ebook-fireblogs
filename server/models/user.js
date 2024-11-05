const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
		},
		bio: {
			type: String,
			maxlength: [100, 'Bio can not be more than 100 characters'],
			trim: true,
		},
		email: {
			type: String,
			maxlength: [30, 'Email can not be more than 20 characters'],
			required: [true, 'Email is required'],
			trim: true,
		},
		name: {
			type: String,
			maxlength: [30, 'Name can not be more than 20 characters'],
			required: [true, 'Name is required'],
			trim: true,
		},
		username: {
			type: String,
			maxlength: [30, 'Username can not be more than 20 characters'],
			required: [true, 'Username is required'],
			trim: true,
		},
		usernameLower: {
			type: String,
			maxlength: [30, 'Username Lower can not be more than 20 characters'],
			trim: true,
		},
		isModerator: {
			type: Boolean,
		},
		registeredAt: {
			type: Date,
			default: Date.now,
		},
		lastVisitAt: {
			type: Date,
			default: Date.now,
		},
		postsCount: {
			type: Number,
			default: 0,
		},
		threads: {
			type: [mongoose.Types.ObjectId],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			mixLength: [6, 'Password should be at least 6 characters'],
			trim: true,
		},
	},
	{
		versionKey: false,
	}
)

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return
	const salt = await bcrypt.genSalt(10)
	this.password = bcrypt.hashSync(this.password, salt)
})

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
}

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
