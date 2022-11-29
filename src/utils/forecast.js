const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=86c44f849b17d5dc288d7afb3e2b7e39&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined);
        }
        else if (body.error) {
            callback('Unable to find Location',undefined);
        }
        else {
            // console.log('Temperature : ' + response.body.current.temperature + '° Celsius');
            // console.log('FeelsLike Temperature : ' + response.body.current.feelslike + '° Celsius');
            // console.log('Weather Descriptions : ' + response.body.current.weather_descriptions[0]);

            const temperature = body.current.temperature;
            const feelsliketemp = body.current.feelslike;
            const weatherDescription = body.current.weather_descriptions;

            callback(undefined,{temperature,feelsliketemp,weatherDescription})
        }
    })

}

module.exports = forecast;