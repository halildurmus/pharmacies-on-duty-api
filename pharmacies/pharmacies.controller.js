const cheerio = require('cheerio');
const got = require('got');
const urlp = require('url');

function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}

// Lists Pharmacies on Duty in specific District.
const getPharmaciesOnDuty = runAsyncWrapper(async function(req, res) {
    console.log("\nListing Pharmacies On Duty in "+req.body.district+"...\n");
    try {
        const url = "https://apps.istanbulsaglik.gov.tr/NobetciEczane/Home/GetEczaneler";
        const headers = {
            'Host': 'apps.istanbulsaglik.gov.tr',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://apps.istanbulsaglik.gov.tr',
            'Connection': 'keep-alive',
            'Referer': 'https://apps.istanbulsaglik.gov.tr/NobetciEczane/'
        };
        let data = `ilce=${req.body.district}`;

        const response = await got.post(url, {headers: headers, body: data});
        var pharmacies = {};
        const $ = await cheerio.load(response.body);
        pharmacies = {status: "success"};
        let key = "pharmacies";
        pharmacies[key] = [];
        $('div.card').each((i, elem) => {
            name = $(elem).find('div.card-header.text-center').last().text().trim();
            phone = $(elem).find('i.la.la-phone').parent().parent().next().children().text().trim();
            address = $(elem).find('i.la.la-home').parent().parent().next().children().text().trim();
            address_description = $(elem).find('i.la.la-map').parent().parent().next().children().text().trim();
            coordinates = $(elem).find('div.card-footer').children().attr('href');
            var q = urlp.parse(coordinates, true);
            var qdata = q.query;
            pharmacies[key].push({
                name: name,
                phone: phone,
                address: address,
                address_description: address_description,
                coordinates: [qdata.lat, qdata.lon]
            })
        });
        console.log(JSON.stringify(pharmacies, null, 2),"\n");
        return res.json(pharmacies);
    } catch (err) {
        pharmacies = {status: "fail", error: err.name};
        console.error(pharmacies);
        return res.status(500).json(pharmacies);
    }
});

module.exports = {
    getPharmaciesOnDuty
};