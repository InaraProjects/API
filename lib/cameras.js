const logger = require('pino')();
const times = require('./times');
const api = require('./api');
const scheduler = require('node-schedule');
const Timer = require('timer-node').Timer;

const cameras = {
  ids: {},
};

module.exports = cameras;

const updateCameras = () => {
  return new Promise((resolve, reject) => {
    api
      .getData('api/v1/data/camera-data?lastUpdated=false')
      .then(query => {
        const timer = new Timer({}).start();

        logger.info('Processing data...');

        query.cameraStations.map(element => {
          cameras.ids[element.id] = {
            stationId: element.roadStationId,
          };

          element.cameraPresets.map(sensor => {
            cameras.ids[element.id][sensor.id] = {
              imageUrl: sensor.imageUrl,
              location: sensor.presentationName,
              timestamp: times.tz(sensor.measuredTime),
            };
          });
        });

        logger.info(`Finished data processing in ${timer.ms()}ms!`);
        timer.stop();

        resolve('Finished updating camera data!');
      })
      .catch(err => {
        reject('Error: ' + err.message);
      });
  });
};

updateCameras();

scheduler.scheduleJob('*/30 * * * *', () => {
  logger.info(`Updating cameras at ${times.tz(new Date())}`);
  updateCameras();
});
