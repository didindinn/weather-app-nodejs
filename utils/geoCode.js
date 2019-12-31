const request = require("request");

const geoCode = (address, callback) => {
  const URL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXJwaXRtYWxpayIsImEiOiJjazQ4Mm80bjkweXdvM2ttcjYzNGNmanpnIn0.HyYaQacqpEu8a9AOPbKLHQ&limit=1";

  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      return callback({
        error: "Something went wrong while fetching your location."
      });
    } else if (response.body.features.length === 0) {
      return callback({
        error: "Could not find the location. Try another search."
      });
    } else {
      return callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
