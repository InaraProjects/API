const convertTZ = time => {
  var json = JSON.stringify(time);
  var dateStr = JSON.parse(json);
  var datex = new Date(dateStr);

  var dateObject = {
    years: datex.getFullYear(),
    months: datex.getMonth(),
    days: datex.getDate(),
    hours: datex.getHours(),
    minutes: datex.getMinutes(),
    seconds: datex.getSeconds(),
    milliseconds: datex.getMilliseconds(),
  };

  return dateObject;
};

const tz = time => {
  var datex = new Date(time);
  return datex.toLocaleString();
};

module.exports = {
  convertTZ,
  tz,
};
