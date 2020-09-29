const { APIError } = require('../../helpers')
const service = require('./istanbul.service')

module.exports = {
	/**
	 * Returns the all districts in Istanbul.
	 * @returns An array or an exception.
	 */
	getDistricts() {
		const data = service.getDistricts()

		if (!data) {
			throw new APIError(500, `Couldn't get the districts in Istanbul.`)
		}

		return data
	},

	/**
	 * Returns the all pharmacies on duty data in Istanbul.
	 * @returns A JSON object or an exception.
	 */
	async getPharmacies() {
		const data = JSON.parse(await service.getPharmacies())

		if (!data || !data.length || !data[0].name) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in Istanbul.`
			)
		}

		return data
	},

	/**
	 * Returns the pharmacies on duty data for provided district in Istanbul.
	 * @param		{string} district district name
	 * @returns	A JSON object or an exception.
	 */
	async getPharmaciesByDistrict(district) {
		const data = await service.getPharmaciesByDistrict(district)

		if (!data || !data.length || !data[0].name) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in ${district}.`
			)
		}

		return data
	},
}
