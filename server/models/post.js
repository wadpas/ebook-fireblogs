const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		edited: {
			at: {
				type: Date,
			},
			by: {
				type: mongoose.Types.ObjectId,
			},
			moderated: {
				type: Boolean,
			},
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		text: {
			type: String,
			maxlength: [2000, 'Text can not be more than 200 characters'],
			required: [true, 'Text is required'],
			trim: true,
		},
		threadId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
