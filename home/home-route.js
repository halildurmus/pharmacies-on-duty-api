const express = require('express')
const router = express.Router()

const name = 'Halil İbrahim Durmuş'
const github = 'https://github.com/ibrahim39'

// GET request for displaying home page.
router.get('/', (req, res) => {
	res.render('istanbul', {
		title: 'Pharmacies on Duty for Istanbul',
		name,
		github,
	})
})

// GET request for displaying about me page.
router.get('/izmir', (req, res) => {
	res.render('izmir', {
		title: 'Pharmacies on Duty for Izmir',
		name,
		github,
	})
})

module.exports = router
