const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/dd2b30cdccf546af4d1080f2486606e7/${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    const currentValues = response.body.currently;
    const { body } = response;
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          currentValues.apparentTemperature
        } degrees and the probability of rain is ${currentValues.precipProbability * 100}%`
      );
    }
  });
};

module.exports = forecast;
