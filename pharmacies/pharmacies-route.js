const express = require('express');

const router = express.Router();
const pharmaciesController = require('../pharmacies/pharmacies-controller');

// POST request for listing Pharmacies on Duty in specific District.
router.post('/', pharmaciesController.getPharmaciesOnDuty);

module.exports = router;
