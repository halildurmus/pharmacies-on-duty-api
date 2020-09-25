const districts = require('./districts')
const { redis } = require('../../db')
const { redisKeyIstanbul } = require('../../config')

class IstanbulService {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKey = redisKey || redisKeyIstanbul
	}

	getDistricts() {
		return districts
	}

	async getPharmacies() {
		return await this.redis.get(this.redisKey)
	}

	async getPharmaciesByDistrict(district) {
		const data = await this.redis.get(this.redisKey)

		if (!data) {
			return
		}

		const pharmacies = JSON.parse(data)

		return pharmacies.filter((p) => p.district.toLowerCase() === district)
	}
}

module.exports = IstanbulService
