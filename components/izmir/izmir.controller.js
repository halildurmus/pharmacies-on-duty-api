const { APIError } = require('../../helpers')
const Service = require('./izmir.service')
const repo = new Service()
const areas = require('./areas')

module.exports = {
	/**
	 * Returns the all areas in Izmir.
	 * @returns An array or an exception.
	 */
	getAreas() {
		const data = repo.getAreas()
		if (!data) {
			throw new APIError(500, `Couldn't get the areas in Izmir.`)
		}

		return data
	},

	/**
	 * Returns the all pharmacies on duty data in Izmir.
	 * @returns A JSON object or an exception.
	 */
	async getPharmacies() {
		const data = JSON.parse(await repo.getPharmacies())
		if (!data || !data.length || !data[0].name) {
			throw new APIError(500, `Couldn't get the pharmacies on duty in Izmir.`)
		}

		return data
	},

	/**
	 * Returns the pharmacies on duty data for provided area code in Izmir.
	 * @param 	{int} areaCode district name
	 * @returns A JSON object or an exception.
	 */
	async getPharmaciesByArea(areaCode) {
		const data = await repo.getPharmaciesByArea(areaCode)
		if (!data || !data.length) {
			const area = areas.find(({ code }) => code === areaCode).name
			if (data.length === 0) {
				throw new APIError(
					404,
					`Couldn't find any pharmacies on duty in ${area}`
				)
			}

			throw new APIError(500, `Couldn't get the pharmacies on duty in ${area}.`)
		}

		return data
	},
}
