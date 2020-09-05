const config = require('../../config')
const { areas } = require('./areas')
const { APIError, redis } = require('../../utils')

/**
 * Returns the pharmacies on duty data for provided area code in Izmir as JSON.
 * @param 	{int} areaCode district name
 * @returns {Object}
 */
const getPharmacies = async (areaCode) => {
	// Fetches the pharmacies on duty data for provided area code from redis.
	const data = await redis.get(config.redisKeyPrefixIzmir + areaCode)
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length) {
		const area = areas.find(({ code }) => code === areaCode).name
		throw new APIError(500, `Couldn't get the pharmacies on duty for ${area}.`)
	}

	if (!pharmacies[0].name) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies data for Izmir. Which means that the scraper couldn't scrape the data from html.`,
			false
		)
	}

	return pharmacies
}

module.exports = getPharmacies
