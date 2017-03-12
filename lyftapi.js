var LyftApi = require('lyft-api');
// var voicething = require('./routes/voice');
var defaultClient = LyftApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: Client Authentication
var ClientAuthentication = defaultClient.authentications['Client Authentication'];
ClientAuthentication.accessToken = "gAAAAABYMIRRu6S9oIys5Czk09ZctznhQ3RZhWsqXC8v3qrEtvVHCQ9KuGtWCZSf_eqeaIwDGHr0OKD7VrUcherdQSss7y7CdMf9PBPldusYy6e8w4KFwW8zNo0ulmibfLCFdk9mn1D15jgm9sx9eocKSHOsnwNy7cHtaOgpJlQIn_Itr6msBOQ="

// Configure OAuth2 access token for authorization: User Authentication
var UserAuthentication = defaultClient.authentications['User Authentication'];
UserAuthentication.accessToken = "gAAAAABYMIRRu6S9oIys5Czk09ZctznhQ3RZhWsqXC8v3qrEtvVHCQ9KuGtWCZSf_eqeaIwDGHr0OKD7VrUcherdQSss7y7CdMf9PBPldusYy6e8w4KFwW8zNo0ulmibfLCFdk9mn1D15jgm9sx9eocKSHOsnwNy7cHtaOgpJlQIn_Itr6msBOQ="

var apiInstance = new LyftApi.PublicApi()

var lat = 39.29898240000001; // {Number} Latitude of a location

var lng = -76.6168984; // {Number} Longitude of a location

var opts = { 
  'rideType': "lyft" // {String} ID of a ride type
};

// console.log('--lyft api--')
// console.log(voicething.transcription.customerLat)
// console.log('--lyft api--')

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
    // var types = response.ride_types;
    console.log(response.header)
    console.log(response.text)

  }
};
apiInstance.ridetypesGet(lat, lng, opts, callback);