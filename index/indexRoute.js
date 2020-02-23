var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
    res.redirect(req.baseUrl + '/districts');
});

module.exports = router;