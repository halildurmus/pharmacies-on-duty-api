const { apiPrefix } = require('../config')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const logger = require('../utils/logger')
const { nodeEnv } = require('../config')

const sendErrorDev = (err, res) => {
	logger.error('ERROR 💥: ', err)

	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		})

		// Programming or other unknown error
	} else if (err.isOperational === false) {
		// 1) Log error
		logger.error('ERROR 💥: ', err)

		// 2) Send generic message
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		})
	}
}

exports.handler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	if (nodeEnv === 'development') {
		sendErrorDev(err, res)
	} else if (nodeEnv === 'production') {
		sendErrorProd(err, res)
	}
}

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
	let convertedError = err

	if (!(err instanceof APIError)) {
		convertedError = new APIError(err.statusCode, err.message)
	}

	return exports.handler(convertedError, req, res)
}

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
	const statusCode = httpStatus.NOT_FOUND
	const message = httpStatus['404']
	const err = new APIError(statusCode, message)

	if (req.url.startsWith(apiPrefix)) {
		return exports.handler(err, req, res)
	}

	return res.status(statusCode).render('404', { title: message })
}
