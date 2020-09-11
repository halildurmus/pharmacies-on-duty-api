const CronJob = require('cron').CronJob
const getIstanbul = require('./scrapers/getIstanbul')
const getIzmir = require('./scrapers/getIzmir')
const logger = require('./utils').loggers.loggerScraper

// Executes the Istanbul and Izmir scrapers.
getIstanbul().catch((err) => logger.error(`${err}`))
getIzmir().catch((err) => logger.error(`${err}`))

// Creates a cronjob which executes the Istanbul scraper every 30 minutes.
const getIstanbulJob = new CronJob(
	'00 0,30 * * * *',
	getIstanbul,
	null,
	false,
	'Europe/Istanbul'
)
getIstanbulJob.start()

// Creates a cronjob which executes the Izmir scraper every 30 minutes.
const getIzmirJob = new CronJob(
	'00 0,30 * * * *',
	getIzmir,
	null,
	false,
	'Europe/Istanbul'
)
getIzmirJob.start()
