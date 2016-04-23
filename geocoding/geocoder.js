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
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};
 
module.exports = function(address, callback){
  gmAPI.geocode(address, function(results, status){
    if(status === google.maps.GeocoderStatus.OK) {
      var geoLocated = results[0].geometry.location
    }
  })
}
 
// reverse geocode API 
var reverseGeocodeParams = {
  "latlng":        "51.1245,-0.0523",
  "result_type":   "postal_code",
  "language":      "en",
  "location_type": "APPROXIMATE"
};
 
gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
  console.log(result);
});