const express = require('express')
const router = express.Router()
const { catchAsync } = require('../../middlewares')
const {
	getAreas,
	getPharmacies,
	getPharmaciesByArea,
} = require('./izmir.controller')

// GET request for listing the areas in Izmir.
router.get('/izmir/areas', async (req, res) => {
	res.json(getAreas())
})

// GET request for listing the all pharmacies on duty in Izmir.
router.get(
	'/izmir/pharmacies/all',
	catchAsync(async (req, res) => {
		res.json({ pharmacies: await getPharmacies() })
	})
)
// GET request for listing the pharmacies on duty for specific area in Izmir.
router.get(
	'/izmir/pharmacies/:areaCode',
	catchAsync(async (req, res) => {
		const areaCode = parseInt(req.params.areaCode)

		if (!getAreas().find(({ code }) => code === areaCode)) {
			return res.status(404).json({
				status: 'fail',
				message: `Couldn't find any data for area code ${areaCode}. You can check the /areas route to see the supported areas.`,
			})
		}

		res.json({ pharmacies: await getPharmaciesByArea(areaCode) })
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
