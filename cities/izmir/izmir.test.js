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
			.get(`${process.env.API_PREFIX}/izmir/areas`)
			.expect(200)
		expect(res.body).toHaveProperty('areas')
		expect(Object.keys(res.body.areas).length).toEqual(63)
	})

	it('should list the all pharmacies on duty in Izmir', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/all`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
		expect(Object.keys(res.body.pharmacies).length).toBeGreaterThan(50)
	})

	it('should list the pharmacies on duty in Alsancak', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/751`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
		expect(res.body.pharmacies[0].areaCode).toEqual(751)
	})

	it('should respond with status code 404 if an invalid area code is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/7511`)
			.expect(404)
		expect(res.body).toHaveProperty('status')
		expect(res.body.status).toEqual('fail')
		expect(res.body).toHaveProperty('message')
		expect(res.body.message).toEqual(
			`Couldn't find any data for area code 7511. You can check the /areas route to see the supported areas.`
		)
	})

	it('should respond with status code 400 if no area code is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body.status).toEqual('fail')
		expect(res.body).toHaveProperty('message')
		expect(res.body.message).toEqual('You need to provide an area code.')
	})
})
