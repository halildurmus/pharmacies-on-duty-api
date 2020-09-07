const { redisKeyPrefixIzmir } = require('../../config')
const { areas } = require('./areas')
const { APIError, redis } = require('../../utils')

// Returns the all pharmacies on duty data in Izmir as JSON.
const getPharmacies = async () => {
	// Fetches the all pharmacies on duty data in Izmir from redis.
	const data = await redis.get(redisKeyPrefixIzmir + 'all')
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length || !pharmacies[0].name) {
		throw new APIError(500, `Couldn't get the pharmacies on duty in Izmir.`)
	}

	return pharmacies
}

/**
 * Returns the pharmacies on duty data for provided area code in Izmir as JSON.
 * @param 	{int} areaCode district name
 * @returns {Object}
 */
const getPharmaciesByArea = async (areaCode) => {
	// Fetches the pharmacies on duty data for provided area code from redis.
	const data = await redis.get(redisKeyPrefixIzmir + areaCode)
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length || !pharmacies[0].name) {
		const area = areas.find(({ code }) => code === areaCode).name
		throw new APIError(500, `Couldn't get the pharmacies on duty in ${area}.`)
	}

	return pharmacies
}

module.exports = {
	getPharmacies,
	getPharmaciesByArea,
}
