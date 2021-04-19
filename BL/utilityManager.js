
const axios = require('axios');
const config = require('../BL/config');

module.exports.getCaptainUpDetails = (captainUpId) => {
    let uri = config.captainUpUrlBase + '/players/' + captainUpId + '?app=' + config.captainUpApiKey;
    return axios.get(uri);
}