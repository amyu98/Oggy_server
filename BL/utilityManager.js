
const axios = require('axios');
const config = require('../BL/config');

module.exports.getCaptainUpDetails = (captainUpId) => {
    let uri = config.captainUpUrlBase + '/players/' + captainUpId + '?app=' + config.captainUpApiKey;
    return axios.get(uri);
}

// TODO
// module.exports.createCaptainUpTaskAction = (task) => {

//     let uri = config.captainUpUrlBase + '/actions' +
//         '?app=' + config.captainUpApiKey +
//         '&secret=' + config.captainUpSecret +
//         '&user=' + '34511859161883380499972634329' +
//         '&action[name]=' + task._id +
//         '&action[entity][name]=' + task.name +
//         '&action[currencies][points][amount]=' + task.points;

//     // TODO USER
//     // TODO? more details

//     // uri = encodeURI(uri);

//     return axios.post(uri);
// }