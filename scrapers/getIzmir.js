const areas = require('../components/izmir/areas')
const cheerio = require('cheerio')
const got = require('got')
const logger = require('../utils').loggers.loggerScraper
const { redis } = require('../db')
const { redisKeyIzmir } = require('../config')

/**
 * Parses the provided HTML data.
 * @param 	html HTML data.
 * @returns An array which contains the pharmacies on duty in Izmir.
 */
function fillResult(html) {
	const pharmacies = []
	const $ = cheerio.load(html)
	$('tbody > tr').each((i, elem) => {
		const area = $(elem).find('td:first').get(0).children[0].data.trim()
		const areaCode = areas.find(({ name }) => name === area).code
		const name = $(elem).find('td:first').next().text().trim()
		const phone = $(elem).find('td:first').next().next().next().text().trim()
		const address = $(elem).find('td:first').next().next().text().trim()
		const lat = $(elem).find('td:last').children().next().attr('value')
		const lon = $(elem).find('td:last').children().next().next().attr('value')

		pharmacies.push({
			area,
			areaCode,
			name,
			phone,
			address,
			coordinates: { lat, lon },
		})
	})

	return pharmacies
}

// Scrapes the cities on duty in Izmir data and saves it to redis.
async function getIzmir() {
	try {
		const url = 'https://www.izmir.bel.tr/tr/NobetciEczane/27'
		const response = await got.get(url)
		const data = fillResult(response.body)

		if (!data || !data.length) {
			logger.error(`Couldn't parse the Izmir data.`)
			return
		}

		// Saves the all pharmacies on duty in Izmir data to redis.
		// The data expires in 30 minutes.
		redis
			.set(
				redisKeyIzmir,
				JSON.stringify(
					data.sort((a, b) =>
						a.area.toLocaleUpperCase() < b.area.toLocaleUpperCase() ? -1 : 1
					)
				),
				'ex',
				30 * 60
			)
			.then(() => logger.info(`Updated the Izmir data.`))
			.catch((err) => logger.error(`${err}`))
	} catch (err) {
		logger.error(`${err} Couldn't fetch the Izmir data.`)
	}
}

module.exports = getIzmir
