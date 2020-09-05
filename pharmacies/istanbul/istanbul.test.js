const request = require('supertest')
const getIstanbul = require('../../scrapers/getIstanbul')
const { redis } = require('../../utils')
const app = require('../../app')

beforeAll(async () => {
	redis.flushall()
	await getIstanbul()
})

afterAll(() => redis.flushall())

describe('API Endpoints for Istanbul', () => {
	it('should list the districts in Istanbul', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul/districts`)
			.expect(200)
		expect(res.body).toHaveProperty('districts')
		expect(Object.keys(res.body.districts).length).toEqual(39)
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
		expect(res.body.status).toEqual('fail')
		expect(res.body).toHaveProperty('message')
		expect(res.body.message).toEqual('You need to provide a valid district.')
	})

	it('should respond with status code 400 if no district is provided', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/pharmacies/istanbul`)
			.expect(400)
		expect(res.body).toHaveProperty('status')
		expect(res.body.status).toEqual('fail')
		expect(res.body).toHaveProperty('message')
		expect(res.body.message).toEqual('You need to provide a district.')
	})
})
