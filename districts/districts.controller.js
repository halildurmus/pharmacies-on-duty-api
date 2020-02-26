const got = require('got');
const cheerio = require('cheerio');

function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}

// Lists Districts of Istanbul.
const getDistricts = runAsyncWrapper(async function(req, res) {
    console.log("\nListing Districts of Istanbul...\n");
    try {
        const url = "https://apps.istanbulsaglik.gov.tr/NobetciEczane/";
        const response = await got(url);
        var districts = {};
        const $ = await cheerio.load(response.body);
        districts = {status: "success"};
        let key = "districts";
        districts[key] = [];
        $('a.ilce-link').each((i, elem) => {
            district = $(elem).text().trim();
            districts[key].push({
                name: district,
            })
        });
        console.log(districts);
        return res.json(districts);
    } catch (err) {
        districts = {status: "fail", error: err.name};
        console.error(districts);
        return res.status(500).json(districts);
    }
});

module.exports = {
    getDistricts
};