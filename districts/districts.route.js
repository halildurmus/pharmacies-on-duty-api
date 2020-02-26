var express = require('express');
var router = express.Router();
var districtsController = require('../districts/districts.controller');

// GET request for listing Districts of Istanbul.
router.get('/', districtsController.getDistricts);

module.exports = router;