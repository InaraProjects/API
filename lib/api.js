const axios = require('axios');
const logger = require('pino')();
const Timer = require('timer-node').Timer;

const getData = path => {
  const timer = new Timer({}).start();

  return new Promise((resolve, reject) => {
    logger.info('Fetching data...');
    var config = {
      method: 'get',
      url: `https://tie.digitraffic.fi/${path}`,
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'application/gzip',
      },
    };

    axios(config)
      .then(function (response) {
        logger.info(`Successfully fetched data in ${timer.ms()}ms!`);
        timer.stop();
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

module.exports = {
  getData,
};
