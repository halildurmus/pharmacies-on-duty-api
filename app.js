const { apiPrefix, swaggerJsonUrl } = require('./config')
const { error } = require('./middlewares')
const cors = require('cors')
const corsOptions = { optionsSuccessStatus: 200 }
const express = require('express')
const hbs = require('hbs')
const homeRouter = require('./components/home/home.route')
const istanbulRouter = require('./components/istanbul/istanbul.route')
const izmirRouter = require('./components/izmir/izmir.route')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
	swaggerOptions: {
		url: swaggerJsonUrl,
	},
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Defines paths for express config.
const publicDirectoryPath = './public'
const viewsPath = './templates/views'
const partialsPath = './templates/partials'
// Setups handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setups static directory to serve.
app.use(express.static(publicDirectoryPath))

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions))
app.use(homeRouter)
app.use(apiPrefix, istanbulRouter)
app.use(apiPrefix, izmirRouter)

app.get(`${apiPrefix}/`, async (req, res) => {
	res.redirect('/docs')
})

app.get('/health', async (req, res) => {
	const healthCheck = {
		message: 'OK',
		uptime: process.uptime(),
		timestamp: Date.now(),
	}

	try {
		res.send(healthCheck)
	} catch (e) {
		healthCheck.message = e
		res.status(503).send()
	}
})

// If the error is not an instanceOf APIError, convert it.
// app.use(error.converter)
// Catch 404 and forward to error handler.
app.use(error.notFound)
// Use custom error handler, send stacktrace only during development.
app.use(error.handler)

module.exports = app
