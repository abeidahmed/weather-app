const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWJlaWRtYW1hIiwiYSI6ImNrOGZqMXAxNDA0dXYzZXFvdWZwNzg4c3oifQ.WX1BvoPBlqp8gv6PdvNgAQ&limit=1`;

  request({ url, json: true }, (error, response) => {
    const data = response.body.features;
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (data.length === 0) {
      callback("Please enter a valid locaton!", undefined);
    } else {
      callback(undefined, {
        latitude: data[0].center[1],
        longitude: data[0].center[0],
        location: data[0].place_name
      });
    }
  });
};

module.exports = geocode;
