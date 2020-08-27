class APIError extends Error {
	constructor(statusCode, message, isOperational) {
		super(message)

		this.statusCode = statusCode
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		this.isOperational = isOperational || true

		Error.captureStackTrace(this, this.constructor)
	}
}

module.exports = APIError
