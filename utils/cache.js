const { redisHost, redisPort, redisPassword } = require('../config')
const Redis = require('ioredis')
const redis = new Redis({
	host: redisHost,
	port: redisPort,
	password: redisPassword,
	family: 4, // 4 (IPv4) or 6 (IPv6)
	db: 0,
})

module.exports = redis
