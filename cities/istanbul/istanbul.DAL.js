const districts = require('./districts')
const redis = require('../../db')
const { redisKeyIstanbul } = require('../../config')

class IstanbulRepository {
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
		const data = JSON.parse(await this.redis.get(this.redisKey))
		if (!data) {
			return
		}

		return data.filter((p) => p.district.toLowerCase() === district)
	}
}

module.exports = IstanbulRepository
