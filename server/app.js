require('dotenv').config()
require('express-async-errors')

const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')

const auth = require('./routes/auth')
const movies = require('./routes/movies')
const posts = require('./routes/posts')
const threads = require('./routes/threads')
const users = require('./routes/users')
const categories = require('./routes/categories')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const authMid = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 5000

app.use(express.static(path.resolve(__dirname, './dist')))
app.use(express.json())
app.use(fileUpload())
app.use(helmet())
app.use(cors())
app.use('/api/v1/auth', auth)
app.use('/api/v1/movies', movies)
app.use('/api/v1/posts', posts)
app.use('/api/v1/threads', threads)
app.use('/api/v1/users', users)
app.use('/api/v1/categories', categories)
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './dist', 'index.html'))
})
app.use(notFound)
app.use(errorHandler)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
