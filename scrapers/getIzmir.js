const { redisKeyPrefixIzmir } = require('../config')
const { areas } = require('../pharmacies/izmir/areas')
const { logger, redis } = require('../utils')
const cheerio = require('cheerio')
const got = require('got')

/**
 * Parses the provided HTML data.
 * @param 	html HTML data.
 * @returns {Array} Pharmacies on duty for Izmir.
 */
function fillResult(html) {
	const pharmacies = []
	const $ = cheerio.load(html)
	$('tbody')
		.children()
		.each((i, elem) => {
			const area = $(elem)
				.find('td')
				.first()
				.clone()
				.children()
				.remove()
				.end()
				.text()
				.trim()
			const areaCode = areas.find(({ name }) => name === area).code
			const name = $(elem).find('td').first().next().text().trim()
			const phone = $(elem)
				.find('td')
				.first()
				.next()
				.next()
				.next()
				.text()
				.trim()
			const address = $(elem).find('td').first().next().next().text().trim()
			const lat = $(elem).find('td').last().children().next().attr('value')
			const lon = $(elem)
				.find('td')
				.last()
				.children()
				.next()
				.next()
				.attr('value')

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

// Scrapes the pharmacies on duty for Izmir data and saves it to redis.
const getIzmir = async () => {
	try {
		const url = 'https://www.izmir.bel.tr/tr/NobetciEczane/27'
		const response = await got.get(url)

		const data = fillResult(response.body)

		if (!data || !data.length) {
			logger.error(`Couldn't parse the Izmir data.`)
			return
		}

		for (let i = 0; i < areas.length; i++) {
			const pharmacies = data.filter(
				({ areaCode }) => areaCode === areas[i].code
			)
			// Saves the pharmacies on duty for Izmir data to redis.
			// The data expires in 30 minutes.
			redis.set(
				redisKeyPrefixIzmir + areas[i].code,
				JSON.stringify(pharmacies),
				'ex',
				30 * 60
			)
		}

		logger.info('Updated the Izmir data.')
	} catch (err) {
		logger.error(`${err} Couldn't fetch the Izmir data.`)
	}
}

module.exports = getIzmir
