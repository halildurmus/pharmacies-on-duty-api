const getIstanbul = require('./scrapers/getIstanbul')
const getIzmir = require('./scrapers/getIzmir')

// Executes the scrapers for Istanbul and Izmir.
getIstanbul().then()
getIzmir().then()

// // Updates the pharmacies on duty for Istanbul data every 30 minutes.
setInterval(getIstanbul, 30 * 60 * 1000)

// Updates the pharmacies on duty for Izmir data every 30 minutes.
setInterval(getIzmir, 30 * 60 * 1000)
