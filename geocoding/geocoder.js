var GoogleMapsAPI = require('googlemaps')

var publicConfig = {
  key: 'AIzaSyAPn3z-8ixvGSXGPxUVP3anBdH20cr-GCE',
  stagger_time:       1000, // for elevationPath 
  encode_polylines:   false,
  secure:             true, // use https 
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};
var gmAPI = new GoogleMapsAPI(publicConfig);
 
// geocode API 
var geocodeParams = {
  "address":    "4 Dorothy Avenue, 21221"
};

gmAPI.geocode(geocodeParams, function(err, result){
  console.log('heygeo ')
  console.log(result.results[0].geometry);
  //console.log('latlng ' + result.geometry.location);
  console.log('-------------------------------------')
});
 
module.exports = function(address, callback){
  gmAPI.geocode(address, function(results, status){
    if(status === google.maps.GeocoderStatus.OK) {
      var latLong = result.results[0].geometry.location
    }
    callback(null, latLong)
  })
}
 

