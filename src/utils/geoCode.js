const request = require('request')

const geoCode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=0b06c63029c2000ccdb812c8b651ce35&query='+encodeURIComponent(address);
    
    request({url, json:true},(error,{body}) => {
            if(error){
                callback('Unable to connect to weather service!',undefined)
            }
            else if(body.error){
                callback('Unable to find Location',undefined);
            }
            else if(body.data.length === 0){
               callback('Unable to find Location',undefined);
            }
            else{
                const latitude = body.data[0].latitude
                const longitude = body.data[0].longitude
                const Location = body.data[0].name;
                // console.log(latitude);
                // console.log(longitude);
                callback(undefined,{Location,latitude,longitude})
            }
        })

}

module.exports = geoCode;