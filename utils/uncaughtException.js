const logger = require('./logger')

module.exports = process.on('uncaughtException', (err) => {
	logger.error(`${err.name} ${err.message}`)
	logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
	process.exit(1)
})
