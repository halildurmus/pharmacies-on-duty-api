const { redisUrl } = require('../config')
const Redis = require('ioredis')
// Creates a redis connection.
const redis = new Redis(redisUrl)

module.exports = redis
