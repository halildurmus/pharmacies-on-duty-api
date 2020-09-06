const express = require('express')
const router = express.Router()
const { APIError } = require('../../utils')
const { areas } = require('./areas')
const { catchAsync } = require('../../middlewares')
const { getPharmacies, getPharmaciesByArea } = require('./izmir-controller')

// GET request for listing the areas in Izmir.
router.get('/izmir/areas', async (req, res) => {
	res.json({ areas })
})

// GET request for listing the all pharmacies on duty in Izmir.
router.get(
	'/izmir/pharmacies/all',
	catchAsync(async (req, res) => {
		const pharmacies = await getPharmacies()

		if (!pharmacies) {
			throw new APIError(500, `Couldn't get the pharmacies on duty in Izmir.`)
		}

		res.json({ pharmacies })
	})
)
// GET request for listing the pharmacies on duty for specific area in Izmir.
router.get(
	'/izmir/pharmacies/:areaCode',
	catchAsync(async (req, res) => {
		const areaCode = parseInt(req.params.areaCode)

		if (!areas.find(({ code }) => code === areaCode)) {
			return res.status(400).json({
				status: 'fail',
				message: `You need to provide a valid area code.`,
			})
		}

		const pharmacies = await getPharmaciesByArea(areaCode)

		if (!pharmacies) {
			throw new APIError(500, `Couldn't get the pharmacies on duty in Izmir.`)
		}

		res.json({ pharmacies })
	})
)

// GET request for when client tries to get the pharmacies on duty in Izmir
// but doesn't provide the area code.
router.get('/izmir/pharmacies*', async (req, res) => {
	res
		.status(400)
		.json({ status: 'fail', message: `You need to provide an area code.` })
})

module.exports = router
