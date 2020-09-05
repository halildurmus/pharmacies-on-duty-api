const { serverPort } = require('./config')
const { logger } = require('./utils')
const app = require('./app')
const port = serverPort || 3000

app.listen(port, () =>
	logger.info(`Server is up on port ${port}.`, { service: 'server' })
)
