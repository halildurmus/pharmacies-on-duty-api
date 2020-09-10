const { logger } = require('../utils')
const { redisUri } = require('../config')
const Redis = require('ioredis')
const redis = new Redis(redisUri)

redis.on('connect', () => {
	logger.info('Client connected to redis.')
})

redis.on('ready', () => {
	logger.info('Client connected to redis and ready to use...')
})

redis.on('error', (err) => {
	logger.error(`Couldn't connect to the redis. ${err.message}`)
})

redis.on('close', () => {
	logger.error('Connection to the redis closed.')
})

redis.on('reconnecting', () => {
	logger.info('Trying to reconnect to the redis.')
})

redis.on('end', () => {
	logger.info('Client disconnected from redis.')
})

process.on('SIGINT', () => {
	redis.quit().then((r) => logger.info(`Redis quit reply: ${r}`))
	logger.info('Redis server closed the connection.')
	process.exit(0)
})

module.exports = redis
