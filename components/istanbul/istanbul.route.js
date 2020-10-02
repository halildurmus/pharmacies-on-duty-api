const express = require('express')
const router = express.Router()
const { catchAsync } = require('../../middlewares')
const {
	getDistricts,
	getPharmacies,
	getPharmaciesByDistrict,
} = require('./istanbul.controller')

// GET request for listing the districts in Istanbul.
router.get(
	'/istanbul/districts',
	catchAsync(async (req, res) => {
		res.json(getDistricts())
	})
)

// GET request for listing the all pharmacies on duty in Istanbul.
router.get(
	'/istanbul/pharmacies/all',
	catchAsync(async (req, res) => {
		res.json({ pharmacies: await getPharmacies() })
	})
)

// GET request for listing the pharmacies on duty for provided district
// in Istanbul.
router.get(
	'/istanbul/pharmacies/:district',
	catchAsync(async (req, res) => {
		const district = req.params.district.toLowerCase()

		if (!getDistricts().find(({ eng }) => eng === district)) {
			return res.status(404).json({
				status: 'fail',
				message: `Couldn't find any data for ${district}. You can checkout the /districts route to see the supported districts.`,
			})
		}

		res.json({ pharmacies: await getPharmaciesByDistrict(district) })
	})
)

// GET request for when client tries to get the pharmacies on duty in Istanbul
// but doesn't provide the district.
router.get('/istanbul/pharmacies*', async (req, res) => {
	res
		.status(400)
		.json({ status: 'fail', message: `You need to provide a district.` })
})

module.exports = router
