const areas = require('./areas')
const redis = require('../../db')
const { redisKeyIzmir } = require('../../config')

class IzmirRepository {
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
		const data = JSON.parse(await this.redis.get(this.redisKey))
		if (!data) {
			return
		}

		return data.filter((p) => p.areaCode === areaCode)
	}
}

module.exports = IzmirRepository
