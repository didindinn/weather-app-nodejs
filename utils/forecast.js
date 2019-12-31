const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const URL = `https://api.darksky.net/forecast/c6fd37a7a521ba8557817aad4260d73d/${latitude},${longitude}?units=si`;

  request({ url: URL, json: true }, (error, response) => {
    const data = response.body;
    if (error) {
      return callback({
        error: "در زمان دریافت اطلاعات هواشناسی یه چیزی اشتباس"
      });
    } else if (data.error) {
      return callback({ error: "ناتوان در شناسایی موقعیت" });
    } else {
      return callback(
        undefined,
        '${data.daily.data[0].summary} دمای کنونی هوا ${data.currently.temperature} درجه سانتی گراد میباشد.\n بیشترین دما: ${data.daily.data[0].temperatureHigh}درجه سانتی گراد میباشد.\n کمترین دما: ${data.daily.data[0].temperatureLow}درجه سانتی گراد میباشد.\n شانس بارندگی امروز شما ${data.currently.precipProbability}% می باشد.'
      );
    }
  });
};

module.exports = forecast;
