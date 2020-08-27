const request = require('supertest')
const app = require('../app')

it('should respond with status code 404 if the requested route is invalid', () => {
	request(app).get('/invalid-route').expect(404)
})
