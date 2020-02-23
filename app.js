const config = require('config');
const serverConfig = config.get('serverConfig');
const express = require('express');
const indexRouter = require('./index/indexRoute');
const districtsRouter = require('./districts/districtsRoute');
const pharmaciesRouter = require('./pharmacies/pharmaciesRoute');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
router.use('/', indexRouter);
router.use('/districts', districtsRouter);
router.use('/pharmacies', pharmaciesRouter);
app.use(serverConfig.apiPrefix, router);

module.exports = app;