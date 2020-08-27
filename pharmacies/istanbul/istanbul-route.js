const express = require('express')
const { catchAsync } = require('../../middlewares/catchAsync')
const router = express.Router()
const { districts } = require('./districts')
const { getPharmacies } = require('./istanbul-controller')

// GET request for listing the districts in Istanbul.
router.get('/pharmacies/istanbul/districts', async (req, res) => {
	return res.json({ districts })
})

// GET request for listing the pharmacies on duty for provided district in Istanbul.
router.get(
	'/pharmacies/istanbul/:district',
	catchAsync(async (req, res, next) => {
		const district = req.params.district.toLowerCase()

		if (!districts.find(({ eng }) => eng.toLowerCase() === district)) {
			return res.status(400).json({
				status: 'error',
				message: `You need to provide a valid district.`,
			})
		}

		const pharmacies = await getPharmacies(district)

		return res.json({ pharmacies })
	})
)

// GET request for when client tries to get the pharmacies on duty for Istanbul
// but not provides the district.
router.get('/pharmacies/istanbul*', async (req, res) => {
	return res
		.status(400)
		.json({ status: 'error', message: `You need to provide a district.` })
})

module.exports = router
