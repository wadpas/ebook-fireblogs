const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema(
	{
		plot: {
			type: String,
			required: true,
		},
		genres: {
			type: [String],
			required: true,
		},
		runtime: {
			type: Number,
			required: true,
		},
		cast: {
			type: [String],
			required: true,
		},
		num_mflix_comments: {
			type: Number,
			required: true,
		},
		poster: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		languages: {
			type: [String],
			required: true,
		},
		released: {
			type: Date,
			required: true,
		},
		directors: {
			type: [String],
			required: true,
		},
		writers: {
			type: [String],
			required: true,
		},
		awards: {
			wins: { type: Number },
			nominations: { type: Number },
			text: { type: String },
		},
		lastupdated: {
			type: Date,
		},
		year: {
			type: Number,
			required: true,
		},
		imdb: {
			rating: { type: Number },
			votes: { type: Number },
			id: { type: Number },
		},
		countries: {
			type: [String],
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		tomatoes: {
			viewer: {
				rating: { type: Number },
				numReviews: { type: Number },
				meter: { type: Number },
			},
			lastupdated: { type: Date },
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Movie', MovieSchema)
