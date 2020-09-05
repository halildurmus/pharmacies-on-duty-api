const { redisHost, redisPort, redisPassword } = require('../config')
const Redis = require('ioredis')
// Creates a redis connection.
const redis = new Redis({
	host: redisHost,
	port: redisPort,
	password: redisPassword,
	family: 4, // 4 (IPv4) or 6 (IPv6).
	db: 1,
})

module.exports = redis
