const express = require('express');

const router = express.Router();
const districtsController = require('../districts/districts-controller');

// GET request for listing Districts of Istanbul.
router.get('/', districtsController.getDistricts);

module.exports = router;
