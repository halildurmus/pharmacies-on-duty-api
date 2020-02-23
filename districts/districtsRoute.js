var express = require('express');
var router = express.Router();
var districts_controller = require('../districts/districtsController');

// GET request for listing Districts of Istanbul.
router.get('/', districts_controller.getDistricts);

module.exports = router;