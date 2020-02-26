var express = require('express');
var router = express.Router();
var pharmaciesController = require('../pharmacies/pharmacies.controller');

// POST request for listing Pharmacies on Duty in specific District.
router.post('/', pharmaciesController.getPharmaciesOnDuty);

module.exports = router;