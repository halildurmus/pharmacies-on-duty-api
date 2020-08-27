const Redis = require('ioredis')
const redis = new Redis({
	port: 6379,
	host: '127.0.0.1',
	family: 4, // 4 (IPv4) or 6 (IPv6)
	password: '',
	db: 0,
})

const flushCache = () => redis.flushall()

module.exports = { redis, flushCache }
