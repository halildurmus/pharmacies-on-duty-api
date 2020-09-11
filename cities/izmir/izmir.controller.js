const Repository = require('./izmir.DAL')
const repo = new Repository()
const { APIError } = require('../../utils')
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
		if (!data || !data.length || !data[0].name) {
			const area = areas.find(({ code }) => code === areaCode).name
			throw new APIError(500, `Couldn't get the pharmacies on duty in ${area}.`)
		}

		return data
	},
}
