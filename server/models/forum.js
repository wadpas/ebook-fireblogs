const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			maxlength: [100, 'Description can not be more than 100 characters'],
			required: [true, 'Description is required'],
			trim: true,
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
		},
		name: {
			type: String,
			maxlength: [30, 'Name can not be more than 20 characters'],
			required: [true, 'Name is required'],
			trim: true,
		},
		slug: {
			type: String,
			maxlength: [30, 'Slug can not be more than 20 characters'],
			trim: true,
		},
		threads: {
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

module.exports = mongoose.model('Forum', ForumSchema)
