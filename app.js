const { apiPrefix } = require('./config')
const cors = require('cors')
const corsOptions = { optionsSuccessStatus: 200 }
const express = require('express')
const hbs = require('hbs')
const homeRouter = require('./home/home-route')
const istanbulRouter = require('./pharmacies/istanbul/istanbul-route')
const izmirRouter = require('./pharmacies/izmir/izmir-route')
const error = require('./middlewares/error')
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define paths for express config.
const publicDirectoryPath = './public'
const viewsPath = './templates/views'
const partialsPath = './templates/partials'

// Setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

// Returns with code 503 for all of the requests.
// app.use((req, res, next) => {
// 	res.status(503).send('Site is currently down. Check back soon!')
// })

// Disables GET requests.
// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		return res.send('GET requests are disabled')
// 	}
// 	next()
// })

app.use(homeRouter)
app.use(apiPrefix, istanbulRouter)
app.use(apiPrefix, izmirRouter)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
