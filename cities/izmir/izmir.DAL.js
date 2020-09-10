const areas = require('./areas')
const redis = require('../../db')
const { APIError } = require('../../utils')
const { redisKeyPrefixIzmir } = require('../../config')

class IzmirRepository {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKeyPrefix = redisKey || redisKeyPrefixIzmir
	}

	getAreas() {
		return areas
	}

	async getPharmacies() {
		const data = await this.redis.get(this.redisKeyPrefix + 'all')
		const pharmacies = JSON.parse(data)

		if (!data) {
			return
		}

		if (!pharmacies.length || !pharmacies[0].name) {
			throw new APIError(500, `Couldn't get the pharmacies on duty in Izmir.`)
		}

		return pharmacies
	}

	async getPharmaciesByArea(areaCode) {
		const data = await this.redis.get(this.redisKeyPrefix + areaCode)
		const pharmacies = JSON.parse(data)

		if (!data) {
			return
		}

		if (!pharmacies.length || !pharmacies[0].name) {
			const area = areas.find(({ code }) => code === areaCode).name
			throw new APIError(500, `Couldn't get the pharmacies on duty in ${area}.`)
		}

		return JSON.parse(data)
	}
}

module.exports = IzmirRepository
