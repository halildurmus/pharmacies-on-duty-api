const { redisKeyPrefixIstanbul } = require('../../config')
const { APIError, redis } = require('../../utils')

// Returns the all pharmacies on duty data in Istanbul as JSON.
const getPharmacies = async () => {
	// Fetches the all pharmacies on duty data in Istanbul from redis.
	const data = await redis.get(redisKeyPrefixIstanbul + 'all')
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length || !pharmacies[0].name) {
		throw new APIError(500, `Couldn't get the pharmacies on duty in Istanbul.`)
	}

	return pharmacies
}

/**
 * Returns the pharmacies on duty data for provided district in Istanbul as JSON.
 * @param		{string} district district name
 * @returns	{Object}
 */
const getPharmaciesByDistrict = async (district) => {
	// Fetches the pharmacies on duty data for provided district from redis.
	const data = await redis.get(redisKeyPrefixIstanbul + district)
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length || !pharmacies[0].name) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies on duty in ${district}.`
		)
	}

	return pharmacies
}

module.exports = {
	getPharmacies,
	getPharmaciesByDistrict,
}
