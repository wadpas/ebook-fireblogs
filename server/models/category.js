const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: [20, 'Name can not be more than 20 characters'],
			required: [true, 'Name is required'],
			trim: true,
		},
		slug: {
			type: String,
			maxlength: [20, 'Slug can not be more than 20 characters'],
			trim: true,
		},
		forums: {
			type: [mongoose.Types.ObjectId],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide userId'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Category', ForumSchema)
