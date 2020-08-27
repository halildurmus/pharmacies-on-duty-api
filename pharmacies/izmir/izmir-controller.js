const config = require('../../config')
const APIError = require('../../utils/APIError')
const { areas } = require('./areas')
const { redis } = require('../../utils/cache')

// Gets the pharmacies on duty data for provided area code in Izmir from cache.
const getPharmacies = async (areaCode) => {
	const data = await redis.get(config.cacheKeyPrefixIzmir + areaCode)
	const parsedData = JSON.parse(data)

	if (!data) {
		throw new APIError(500, `Couldn't get the pharmacies on duty for Izmir.`)
	}

	if (!parsedData.length) {
		const area = areas.find(({ code }) => code === areaCode).name
		throw new APIError(500, `Couldn't get the pharmacies on duty for ${area}.`)
	}

	if (!parsedData[0].name) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies data for Izmir. Which means that the scraper couldn't scrape the data from html.`,
			false
		)
	}

	return parsedData
}

module.exports = { getPharmacies }
