const cheerio = require('cheerio')
const districts = require('../cities/istanbul/districts')
const got = require('got')
const logger = require('../utils').loggers.loggerScraper
const redis = require('../db')
const { redisKeyIstanbul } = require('../config')

// Scrapes the h token which is needed for scraping the pharmacies on duty
// in Istanbul data.
async function getHToken() {
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
 * @param 	{Object}	data HTML data.
 * @returns An array which contains the pharmacies on duty in Istanbul.
 */
function fillResult(data) {
	const { eczaneler } = data
	const pharmaciesData = eczaneler.filter(({ il }) => il === 'İstanbul')

	const pharmacies = []
	pharmaciesData.forEach((obj) => {
		const districtEng = districts.find(({ district }) => district === obj.ilce)
			.eng
		const name = obj.eczane_ad
		const phone = obj.eczane_tel
		const address = obj.mahalle + ' ' + obj.cadde_sokak + ' ' + obj.bina_kapi
		const addressDescription = obj.tarif
		const lat = obj.lat
		const lon = obj.lng

		pharmacies.push({
			district: districtEng,
			name,
			phone,
			address,
			address_description: addressDescription,
			coordinates: { lat, lon },
		})
	})

	return pharmacies
}

// Scrapes the pharmacies on duty in Istanbul data and saves it to redis.
async function getIstanbul() {
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

		// Saves the all pharmacies on duty in Istanbul data to redis.
		// The data expires in 30 minutes.
		redis
			.set(
				redisKeyIstanbul,
				JSON.stringify(
					data.sort((a, b) =>
						a.district.toLocaleUpperCase() < b.district.toLocaleUpperCase()
							? -1
							: 1
					)
				),
				'ex',
				30 * 60
			)
			.then(() => logger.info(`Updated the Istanbul data.`))
			.catch((err) => logger.error(`${err}`))
	} catch (err) {
		logger.error(`${err} Couldn't fetch the Istanbul data.`)
	}
}

module.exports = getIstanbul
