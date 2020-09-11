require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	nodeEnv: process.env.NODE_ENV,
	redisKeyIstanbul: process.env.REDIS_KEY_ISTANBUL,
	redisKeyIzmir: process.env.REDIS_KEY_IZMIR,
	redisUri: process.env.REDIS_URL,
	swaggerJsonUrl: process.env.SWAGGER_JSON_URL,
}
