const { redisKeyPrefixIstanbul } = require('../config')
const { districts } = require('../pharmacies/istanbul/districts')
const { logger, redis } = require('../utils')
const cheerio = require('cheerio')
const got = require('got')

// Scrapes the h token which is needed for scraping the pharmacies on duty
// for Istanbul data.
const getHToken = async () => {
	try {
		const url = 'https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/'
		const response = await got.get(url)

		const $ = cheerio.load(response.body)
		const h = $('input#h').attr('value')
		logger.info('Fetched the h token.')

		return h
	} catch (err) {
		logger.error(`${err} Couldn't fetch the h token.`)
	}
}

/**
 * Parses the provided JSON data.
 * @param 	{Object} 	data HTML data.
 * @returns {Array} 	Pharmacies on duty for Istanbul.
 */
const fillResult = (data) => {
	const { eczaneler } = data
	const pharmaciesData = eczaneler.filter(({ il }) => il === 'İstanbul')

	const pharmacies = []
	pharmaciesData.forEach((obj) => {
		const district = obj.ilce
		const name = obj.eczane_ad
		const phone = obj.eczane_tel
		const address = obj.mahalle + ' ' + obj.cadde_sokak + ' ' + obj.bina_kapi
		const addressDescription = obj.tarif
		const lat = obj.lat
		const lon = obj.lng

		pharmacies.push({
			district,
			name,
			phone,
			address,
			address_description: addressDescription,
			coordinates: { lat, lon },
		})
	})

	return pharmacies
}

// Scrapes the pharmacies on duty for Istanbul data and saves it to redis.
const getIstanbul = async () => {
	try {
		const h = await getHToken()

		if (!h) {
			logger.error(`Couldn't fetch the h token.`)
			return
		}

		const url =
			'https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/index.php'
		const headers = {
			Accept: 'application/json, text/javascript, */*; q=0.01',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With': 'XMLHttpRequest',
		}
		const body = `jx=1&islem=get_eczane_markers&h=${h}`
		const response = await got.post(url, { headers, body })

		const data = fillResult(JSON.parse(response.body))

		if (!data || !data.length) {
			logger.error(`Couldn't parse the Istanbul data.`)
			return
		}

		for (let i = 0; i < districts.length; i++) {
			const pharmacies = data.filter(
				({ district }) => district === districts[i].district
			)
			// Saves the pharmacies on duty for Istanbul data to redis.
			// The data expires in 30 minutes.
			redis
				.set(
					redisKeyPrefixIstanbul + districts[i].eng.toLowerCase(),
					JSON.stringify(pharmacies),
					'ex',
					30 * 60
				)
				.catch((err) => logger.error(err))
		}

		logger.info('Updated the Istanbul data.')
	} catch (err) {
		if (err.name === 'SyntaxError') {
			logger.error(
				`${err} Got HTML response instead of JSON when fetching the Istanbul data.`
			)
		} else if (err.name === 'TypeError') {
			logger.error(
				`${err} Couldn't fetch the Istanbul data There may be an issue with the h token.`
			)
		} else {
			logger.error(`${err} Couldn't fetch the Istanbul data.`)
		}
	}
}

module.exports = getIstanbul
