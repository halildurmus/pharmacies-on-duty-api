const { getIstanbul } = require('../../scrapers/getIstanbul')
const { flushCache } = require('../../utils/cache')
const request = require('supertest')
const app = require('../../app')

beforeAll(async () => await getIstanbul())

afterAll(() => flushCache())

describe('API Endpoints for Istanbul', () => {
	it('should list the districts in Istanbul', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul/districts`)
			.expect(200)
		expect(res.body).toHaveProperty('districts')
	})

	it('should list the pharmacies on duty in Kadıköy', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul/Kadikoy`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
	})

	it('should respond with status code 400 if an invalid district is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul/Cankaya`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body).toHaveProperty('message')
	})

	it('should respond with status code 400 if no district is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body).toHaveProperty('message')
	})
})
