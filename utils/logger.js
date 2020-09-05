const { nodeEnv } = require('../config')
const { createLogger, format, transports } = require('winston')
const { colorize, combine, json, printf, timestamp } = format

const logger = createLogger({
	level: 'info',
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		json()
	),
	defaultMeta: { service: 'pharmacies-service' },
	transports: [
		// - Write all logs with level `error` and below to `error.log`.
		// - Write all logs with level `info` and below to `combined.log`.
		new transports.File({
			filename: './logs/error.log',
			level: 'error',
		}),
		new transports.File({ filename: './logs/combined.log' }),
	],
})

// Custom format for logging to the `console`.
const myFormat = printf(({ level, message, service, timestamp }) => {
	return `${timestamp} ${level}: ${message} [${service}]`
})

// Log to the `console` if we're not in production.
if (nodeEnv !== 'production') {
	logger.add(
		new transports.Console({
			format: combine(timestamp(), colorize(), myFormat),
		})
	)
}

module.exports = logger
