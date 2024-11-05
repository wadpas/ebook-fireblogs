const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema(
	{
		contributors: {
			type: [mongoose.Types.ObjectId],
		},
		firstPostId: {
			type: mongoose.Types.ObjectId,
		},
		forumId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		lastPostAt: {
			type: Date,
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
		},
		posts: {
			type: [mongoose.Types.ObjectId],
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		slug: {
			type: String,
			maxlength: [50, 'Slug can not be more than 50 characters'],
			trim: true,
		},
		title: {
			type: String,
			maxlength: [50, 'field can not be more than 50 characters'],
			required: [true, 'field is required'],
			trim: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Thread', ThreadSchema)
