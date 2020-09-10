require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	nodeEnv: process.env.NODE_ENV,
	redisKeyPrefixIstanbul: process.env.REDIS_KEY_PREFIX_ISTANBUL,
	redisKeyPrefixIzmir: process.env.REDIS_KEY_PREFIX_IZMIR,
	redisUri: process.env.REDIS_URL,
	swaggerJsonUrl: process.env.SWAGGER_JSON_URL,
}
