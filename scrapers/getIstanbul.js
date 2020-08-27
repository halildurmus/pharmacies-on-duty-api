const config = require('../config')
const logger = require('../utils/logger')
const cheerio = require('cheerio')
const got = require('got')
const { redis } = require('../utils/cache')
const { districts } = require('../pharmacies/istanbul/districts')

const getHToken = async () => {
	try {
		const url = 'https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/'
		const response = await got.get(url)

		const $ = cheerio.load(response.body)
		const h = $('input#h').attr('value')
		logger.info('Successfully fetched the h token.')

		return h
	} catch (err) {
		logger.error(`${err} Couldn't fetch the h token.`)
	}
}

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

		const { eczaneler } = JSON.parse(response.body)
		const data = eczaneler.filter(({ il }) => il === 'İstanbul')

		const formattedData = []
		data.forEach((obj) => {
			const district = obj.ilce
			const name = obj.eczane_ad
			const phone = obj.eczane_tel
			const address = obj.mahalle + ' ' + obj.cadde_sokak + ' ' + obj.bina_kapi
			const addressDescription = obj.tarif
			const lat = obj.lat
			const lon = obj.lng

			formattedData.push({
				district,
				name,
				phone,
				address,
				address_description: addressDescription,
				coordinates: { lat, lon },
			})
		})

		logger.info('Successfully updated the Istanbul data.')

		for (let i = 0; i < districts.length; i++) {
			const pharmacies = formattedData.filter(
				({ district }) => district === districts[i].district
			)
			redis
				.set(
					config.redisKeyPrefixIstanbul + districts[i].eng.toLowerCase(),
					JSON.stringify(pharmacies),
					'ex',
					30 * 60
				)
				.catch((err) => logger.error(err))
		}
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

module.exports = { getIstanbul }
