const districts = require('./districts')
const { redis } = require('../../db')
const { redisKeyIstanbul } = require('../../config')

module.exports = {
	getDistricts() {
		return districts
	},

	async getPharmacies() {
		return await redis.get(redisKeyIstanbul)
	},

	async getPharmaciesByDistrict(district) {
		const data = await redis.get(redisKeyIstanbul)

		if (!data) {
			return
		}

		const pharmacies = JSON.parse(data)

		return pharmacies.filter((p) => p.district === district)
	},
}
