const getIstanbul = require('../scrapers/getIstanbul')
const getIzmir = require('../scrapers/getIzmir')
const { redis } = require('../db')

global.beforeAll(async () => {
	redis.flushall()
	await getIstanbul()
	await getIzmir()
})

global.afterAll(() => redis.flushall())
