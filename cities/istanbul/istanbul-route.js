const express = require('express')
const router = express.Router()
const { APIError } = require('../../utils')
const { catchAsync } = require('../../middlewares')
const { districts } = require('./districts')
const {
	getPharmacies,
	getPharmaciesByDistrict,
} = require('./istanbul-controller')

// GET request for listing the districts in Istanbul.
router.get('/istanbul/districts', async (req, res) => {
	res.json({ districts })
})

// GET request for listing the all pharmacies on duty in Istanbul.
router.get(
	'/istanbul/pharmacies/all',
	catchAsync(async (req, res) => {
		const pharmacies = await getPharmacies()

		if (!pharmacies) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in Istanbul.`
			)
		}

		res.json({ pharmacies })
	})
)

// GET request for listing the pharmacies on duty for provided district
// in Istanbul.
router.get(
	'/istanbul/pharmacies/:district',
	catchAsync(async (req, res, next) => {
		const district = req.params.district.toLowerCase()

		if (!districts.find(({ eng }) => eng.toLowerCase() === district)) {
			return res.status(400).json({
				status: 'fail',
				message: `You need to provide a valid district.`,
			})
		}

		const pharmacies = await getPharmaciesByDistrict(district)

		if (!pharmacies) {
			throw new APIError(
				500,
				`Couldn't get the pharmacies on duty in Istanbul.`
			)
		}

		res.json({ pharmacies })
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
