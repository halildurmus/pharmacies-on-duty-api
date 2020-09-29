const areas = require('./areas')
const { redis } = require('../../db')
const { redisKeyIzmir } = require('../../config')

module.exports = {
	getAreas() {
		return areas
	},

	async getPharmacies() {
		return await redis.get(redisKeyIzmir)
	},

	async getPharmaciesByArea(areaCode) {
		const data = await redis.get(redisKeyIzmir)

		if (!data) {
			return
		}

		const pharmacies = JSON.parse(data)

		return pharmacies.filter((p) => p.areaCode === areaCode)
	},
}
