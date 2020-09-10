const districts = require('./districts')
const redis = require('../../db')
const { APIError } = require('../../utils')
const { redisKeyPrefixIstanbul } = require('../../config')

class IstanbulRepository {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKeyPrefix = redisKey || redisKeyPrefixIstanbul
	}

	getDistricts() {
		return districts
	}

	async getPharmacies() {
		const data = await this.redis.get(this.redisKeyPrefix + 'all')
		const pharmacies = JSON.parse(data)

		if (!data) {
			return
		}

		if (!pharmacies.length || !pharmacies[0].name) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in Istanbul.`
			)
		}

		return pharmacies
	}

	async getPharmaciesByDistrict(district) {
		const data = await this.redis.get(this.redisKeyPrefix + district)
		const pharmacies = JSON.parse(data)

		if (!data) {
			return
		}

		if (!pharmacies.length || !pharmacies[0].name) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in ${district}.`
			)
		}

		return JSON.parse(data)
	}
}

module.exports = IstanbulRepository
