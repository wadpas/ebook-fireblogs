const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { BadRequestError, NotFoundError } = require('../errors')

const uploadProductImage = async (req, res) => {
	console.log(req.files)

	if (!req.files) {
		throw new BadRequestError('No File Uploaded')
	}
	const productImage = req.files.image
	if (!productImage.mimetype.startsWith) {
		throw new BadRequestError('Please Upload Image')
	}
	const maxSize = 2024 * 2024
	if (productImage.size > maxSize) {
		throw new BadRequestError('Please upload image smaller than 4MB')
	}
	const imagePath = path.join(__dirname, '../client/public/uploads/' + `${productImage.name}`)
	await productImage.mv(imagePath)
	res.status(StatusCodes.OK).json({ src: `/uploads/${productImage.name}` })
}

module.exports = {
	uploadProductImage,
}
