const Repository = require('./izmir.DAL')
const repo = new Repository()

module.exports = {
	// Returns the all areas in Izmir as JSON.
	getAreas() {
		const data = repo.getAreas()

		if (!data) {
			return
		}

		return data
	},

	// Returns the all pharmacies on duty data in Izmir as JSON.
	async getPharmacies() {
		// Fetches the all pharmacies on duty data in Izmir from redis.
		const data = await repo.getPharmacies()

		if (!data) {
			return
		}

		return data
	},

	/**
	 * Returns the pharmacies on duty data for provided area code in Izmir as JSON.
	 * @param 	{int} areaCode district name
	 * @returns {Object}
	 */
	async getPharmaciesByArea(areaCode) {
		// Fetches the pharmacies on duty data for provided district from redis.
		const data = await repo.getPharmaciesByArea(areaCode)

		if (!data) {
			return
		}

		return data
	},
}
