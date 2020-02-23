var express = require('express');
var router = express.Router();
var pharmacies_controller = require('../pharmacies/pharmaciesController');

// POST request for listing Pharmacies on Duty in specific District.
router.post('/', pharmacies_controller.getPharmaciesOnDuty);

module.exports = router;