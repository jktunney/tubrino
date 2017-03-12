var GoogleMapsAPI = require('googlemaps')

var publicConfig = {
  key: '',
  stagger_time:       1000, // for elevationPath 
  encode_polylines:   false,
  secure:             true, // use https 
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};
var gmAPI = new GoogleMapsAPI(publicConfig);
 
module.exports = function(concatVar, callback){
  gmAPI.geocode(concatVar, function(err, result){
      console.log('geocode results')
      console.log(result)
      var latLong = result.results[0].geometry;
      callback(null, latLong)
  })
}