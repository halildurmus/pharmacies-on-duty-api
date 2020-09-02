const { redisKeyPrefixIstanbul } = require('../../config')
const { APIError, redis } = require('../../utils')

// Gets the pharmacies on duty data for provided district in Istanbul from cache.
const getPharmacies = async (district) => {
	const data = await redis.get(redisKeyPrefixIstanbul + district)
	const parsedData = JSON.parse(data)

	if (!data) {
		throw new APIError(500, `Couldn't get the data for Istanbul.`)
	}

	if (!parsedData.length) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies on duty for ${district}.`
		)
	}

	if (!parsedData[0].name) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies data for Istanbul. Which means that the scraper couldn't scrape the data from html.`,
			false
		)
	}

	return parsedData
}

module.exports = getPharmacies
