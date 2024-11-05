const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: [50, 'Title field can not be more than 50 characters'],
			required: [true, 'Title field is required'],
			trim: true,
		},
		description: {
			type: String,
			maxlength: [1000, 'Description can not be more than 1000 characters'],
			required: [true, 'Description field is required'],
			trim: true,
		},
		button: {
			type: String,
			maxlength: [20, 'Button field can not be more than 20 characters'],
			required: [true, 'Button field is required'],
			trim: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Banner', BannerSchema)
