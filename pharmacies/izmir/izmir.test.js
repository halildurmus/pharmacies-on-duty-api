const request = require('supertest')
const getIzmir = require('../../scrapers/getIzmir')
const { redis } = require('../../utils')
const app = require('../../app')

beforeAll(async () => {
	redis.flushall()
	await getIzmir()
})

afterAll(() => redis.flushall())

describe('API Endpoints for Izmir', () => {
	it('should list the areas in Izmir', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/izmir/areas`)
			.expect(200)
		expect(res.body).toHaveProperty('areas')
	})

	it('should list the pharmacies on duty in Alsancak', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/izmir/751`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
		expect(res.body.pharmacies[0].areaCode).toEqual(751)
	})

	it('should respond with status code 400 if an invalid area code is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/izmir/7511`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body).toHaveProperty('message')
	})

	it('should respond with status code 400 if no area code is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/izmir`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body).toHaveProperty('message')
	})
})
