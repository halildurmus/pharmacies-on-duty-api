require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	cacheKeyPrefixIstanbul: process.env.CACHE_KEY_PREFIX_ISTANBUL,
	cacheKeyPrefixIzmir: process.env.CACHE_KEY_PREFIX_IZMIR,
	nodeEnv: process.env.NODE_ENV,
	serverPort: process.env.SERVER_PORT,
}
