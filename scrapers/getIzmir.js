const config = require('../config')
const logger = require('../utils/logger')
const { areas } = require('../pharmacies/izmir/areas')
const cheerio = require('cheerio')
const got = require('got')
const { redis } = require('../utils/cache')

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

const getIzmir = async () => {
	try {
		const url = 'https://www.izmir.bel.tr/tr/NobetciEczane/27'
		const response = await got.get(url)

		const data = fillResult(response.body)

		if (!data || !data.length) {
			logger.error(`Couldn't fill the Izmir data.`)
			return
		}

		logger.info('Successfully updated the Izmir data.')

		for (let i = 0; i < areas.length; i++) {
			const pharmacies = data.filter(
				({ areaCode }) => areaCode === areas[i].code
			)
			redis.set(
				config.redisKeyPrefixIzmir + areas[i].code,
				JSON.stringify(pharmacies),
				'ex',
				30 * 60
			)
		}
	} catch (err) {
		logger.error(`${err} Couldn't fetch the Izmir data.`)
	}
}

module.exports = { getIzmir }
