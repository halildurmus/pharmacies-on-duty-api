const app = require('../../app')
const getIzmir = require('../../scrapers/getIzmir')
const { redis } = require('../../db')
const request = require('supertest')

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
		expect(Object.keys(res.body).length).toEqual(63)
	})

	it('should list the all pharmacies on duty in Izmir', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/all`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
		expect(Object.keys(res.body.pharmacies).length).toBeGreaterThan(50)
	})

	it('should list the pharmacies on duty in Bornova 1', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/584`)
			.expect(200)
		expect(res.body).toHaveProperty('pharmacies')
		expect(res.body.pharmacies[0].areaCode).toEqual(584)
	})

	it('should respond with status code 404 if an invalid area code is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/izmir/pharmacies/7511`)
			.expect(404)
		expect(res.body).toHaveProperty('status')
		expect(res.body.status).toEqual('fail')
		expect(res.body).toHaveProperty('message')
		expect(res.body.message).toEqual(
			`Couldn't find any data for area code 7511. You can checkout the /areas route to see the supported areas.`
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
