const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const URL = `https://api.darksky.net/forecast/0700b3bd8a2ffb53ca59fbeb2e3bf03b/${latitude},${longitude}?units=si`;

  request({ url: URL, json: true }, (error, response) => {
    const data = response.body;
    if (error) {
      return callback({
        error: "Something went wrong while fetching weather."
      });
    } else if (data.error) {
      return callback({ error: "Unable to find location" });
    } else {
      return callback(
        undefined,
        `${data.daily.data[0].summary} It is currently ${data.currently.temperature}°C.\
          Highest Temperature: ${data.daily.data[0].temperatureHigh}°C.\
          Lowest Temperature: ${data.daily.data[0].temperatureLow}°C.\
          There is a ${data.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
