const Repository = require('./istanbul.DAL')
const repo = new Repository()

module.exports = {
	// Returns the all districts in Istanbul as JSON.
	getDistricts() {
		const data = repo.getDistricts()

		if (!data) {
			return
		}

		return data
	},

	// Returns the all pharmacies on duty data in Istanbul as JSON.
	async getPharmacies() {
		// Fetches the all pharmacies on duty data in Istanbul from redis.
		const data = await repo.getPharmacies()

		if (!data) {
			return
		}

		return data
	},

	/**
	 * Returns the pharmacies on duty data for provided district in Istanbul as JSON.
	 * @param		{string} district district name
	 * @returns	{Object}
	 */
	async getPharmaciesByDistrict(district) {
		// Fetches the pharmacies on duty data for provided district from redis.
		const data = await repo.getPharmaciesByDistrict(district)

		if (!data) {
			return
		}

		return data
	},
}
