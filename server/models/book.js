const mongoose = require('mongoose')

const BookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: [50, 'Title field can not be more than 50 characters'],
			required: [true, 'Title field is required'],
			trim: true,
		},
		author: {
			type: String,
			maxlength: [50, 'Author field can not be more than 50 characters'],
			required: [true, 'Author field is required'],
			trim: true,
		},
		description: {
			type: String,
			maxlength: [1000, 'Description field can not be more than 1000 characters'],
			required: [true, 'Description field is required'],
			trim: true,
		},
		year: {
			type: Number,
			maxlength: [4, 'Year field can not be more than 4 characters'],
			required: [true, 'Year field is required'],
			trim: true,
		},
		genre: [
			{
				type: String,
				required: [true, 'Genre field is required'],
				trim: true,
			},
		],
		image: {
			type: String,
			required: [true, 'Images field is required'],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Book', BookSchema)
