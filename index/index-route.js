const express = require('express');

const router = express.Router();

// GET home page.
router.get('/', (req, res) => {
  res.redirect(`${req.baseUrl}/districts`);
});

module.exports = router;
