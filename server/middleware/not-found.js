const { NotFoundError } = require('../errors')

const notFound = (req, res) => {
	throw new NotFoundError(`No route with path ${req.path}`)
}

module.exports = notFound
