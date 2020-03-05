const config = require('config');

const serverConfig = config.get('serverConfig');
const express = require('express');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use('/', require('./index/index-route'));
router.use('/districts', require('./districts/districts-route'));
router.use('/pharmacies', require('./pharmacies/pharmacies-route'));

app.use(serverConfig.apiPrefix, router);

module.exports = app;
