const express = require('express')
const { catchAsync } = require('../../middlewares/catchAsync')
const router = express.Router()
const { areas } = require('./areas')
const { getPharmacies } = require('./izmir-controller')

// GET request for listing the areas in Izmir.
router.get('/pharmacies/izmir/areas', async (req, res) => {
	return res.json({ areas })
})

// GET request for listing the pharmacies on duty for specific area in Izmir.
router.get(
	'/pharmacies/izmir/:areaCode',
	catchAsync(async (req, res) => {
		const areaCode = parseInt(req.params.areaCode)

		if (!areas.find(({ code }) => code === areaCode)) {
			return res.status(400).json({
				status: 'error',
				message: `You need to provide a valid area code.`,
			})
		}

		const pharmacies = await getPharmacies(areaCode)

		return res.json({ pharmacies })
	})
)

// GET request for when client tries to get the pharmacies on duty for Izmir
// but not provides the area code.
router.get('/pharmacies/izmir*', async (req, res) => {
	return res
		.status(400)
		.json({ status: 'error', message: `You need to provide an area code.` })
})

module.exports = router
