require('./utils/uncaughtException')
const { serverPort } = require('./config')
const { logger } = require('./utils')
const app = require('./app')
const port = serverPort || 3000

const server = app.listen(port, () =>
	logger.info(`Server is up on port ${port}.`, { service: 'server' })
)

process.on('unhandledRejection', (err) => {
	logger.error(`${err.name} ${err.message}`)
	logger.error('UNHANDLED REJECTION! 💥 Shutting down...')
	server.close(() => {
		process.exit(1)
	})
})
