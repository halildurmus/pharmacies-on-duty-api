const areas = require('./areas')
const { redis } = require('../../db')
const { redisKeyIzmir } = require('../../config')

class IzmirService {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKey = redisKey || redisKeyIzmir
	}

	getAreas() {
		return areas
	}

	async getPharmacies() {
		return await this.redis.get(this.redisKey)
	}

	async getPharmaciesByArea(areaCode) {
		const data = await this.redis.get(this.redisKey)

		if (!data) {
			return
		}

		const pharmacies = JSON.parse(data)

		return pharmacies.filter((p) => p.areaCode === areaCode)
	}
}

module.exports = IzmirService
