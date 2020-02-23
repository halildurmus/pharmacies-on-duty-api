const config = require('config');
const serverConfig = config.get('serverConfig');
const app = require('./app');

app.listen(serverConfig.port, serverConfig.host, () =>
    console.log("\nPharmacies on Duty API started running on: http://%s:%s"+serverConfig.apiPrefix, serverConfig.host, serverConfig.port));