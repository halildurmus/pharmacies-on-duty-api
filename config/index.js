require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
	redisPassword: process.env.REDIS_PASSWORD,
	redisKeyPrefixIstanbul: process.env.REDIS_KEY_PREFIX_ISTANBUL,
	redisKeyPrefixIzmir: process.env.REDIS_KEY_PREFIX_IZMIR,
	nodeEnv: process.env.NODE_ENV,
	serverPort: process.env.SERVER_PORT,
}
