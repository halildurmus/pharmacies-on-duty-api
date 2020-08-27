const express = require('express')
const router = express.Router()

// GET home page.
router.get('/', (req, res) => {
	res.render('istanbul', {
		title: 'Pharmacies on Duty for Istanbul',
		name: 'Halil İbrahim Durmuş',
		github: 'https://github.com/ibrahim39',
	})
})

// GET about me page.
router.get('/izmir', (req, res) => {
	res.render('izmir', {
		title: 'Pharmacies on Duty for Izmir',
		name: 'Halil İbrahim Durmuş',
		github: 'https://github.com/ibrahim39',
	})
})

module.exports = router
