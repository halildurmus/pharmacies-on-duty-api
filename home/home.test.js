const request = require('supertest')
const app = require('../app')

it('should respond with status code 200', async () => {
	app.set('views', './templates/views')
	app.set('view engine', 'hbs')
	app.engine('hbs', (path, options, callback) => {
		const details = Object.assign({ path }, options)
		callback(null, JSON.stringify(details))
	})
	await request(app).get('/').expect(200)
})
