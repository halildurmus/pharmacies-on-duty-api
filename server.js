const app = require('./app')
const http = require('http')
const logger = require('./utils/logger').loggerServer
const port = process.env.PORT || 3000
const { redis } = require('./db')

const server = http.createServer(app)

server.listen(port)

server.once('listening', () => {
	const { port } = server.address()
	logger.info(`Server is listening on port ${port}`)
})

server.once('error', (err) => {
	logger.error(`${err}`)
	process.exit(1)
})

async function gracefullyShutdown(err) {
	if (err.name && err.message) {
		logger.error(`${err.name} ${err.message}`)
	}

	logger.error('💥 Shutting down...')
	server.close(async () => {
		logger.info('HTTP server closed.')
		await redis.quit()
		process.exit(0)
	})
}

process.on('SIGINT', gracefullyShutdown)
process.on('SIGTERM', gracefullyShutdown)
process.on('unhandledRejection', gracefullyShutdown)
