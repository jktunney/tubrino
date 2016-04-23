var request = require('request')
  , qs = require('querystring');

var Uber = require('../index');

var uber = new Uber({
  client_id: '5tzqAQx84xIaTjUvxnN3sc86lB82JopV',
  client_secret: 'S9uquJpXcXHJSI0easndrMA6yBWLmHMM_tRiSGuk',
  server_token: 'Y9M_N84-YS2nHDHZL89q9qyCuRtVhaHc8yTd2QfL',
  redirect_uri: 'http://localhost/callback',
  name: 'nodejs uber wrapper'
});

//console.log(uber);

var parameters = {
  'response_type': 'code',
  'redirect_uri': 'http://localhost/callback',
  'scope': 'history'
}

console.log(uber.oauth2.getAuthorizeUrl(parameters));
console.log(uber.getAuthorizeUrl(['profile', 'history']));
uber.authorization({ authorization_code: 'gEA0FX57gbF0h217gEuD7fOAwkpSmN' }, function (err, accessToken, refreshToken) {
  console.log(err);
  console.log(accessToken);
  console.log(refreshToken);
  uber.user.profile(accessToken, function (err, res) {
    console.log(err);
    console.log(res);
  });

  uber.user.activity({
    access_token: accessToken
  }, function (err, res) {
    console.log(err);
    console.log(res);
  });
});

// uber.authorization({ authorization_code: 'oV1seYCKU9hJdKPQuDM1YI9cf5mR4K' }, function (err, accessToken, refreshToken) {
//   console.log(accessToken);
//   console.log(refreshToken);
// });

// uber.promotions.list({ 
//   start_latitude: 3.1357, 
//   start_longitude: 101.6880,
//   end_latitude: 3.1357,
//   end_longitude: 101.6880
// }, function (err, res) {
//   if (err) console.error(err);
//   console.log(res);
// });

// uber.authorization({ refresh_token: 'cgFUwb4vns0eygzJGWxBIghOQvFArv' }, function (err, access_token, refresh_token) {
//   console.log(err);
//   console.log(access_token);
//   console.log(refresh_token);
// });


//console.log(uber.defaults.base_url + '/products');
//console.log(qs.stringify({ server_token: uber.defaults.server_token, latitude: 3.1357, longitude: 101.6880 }));
// request.get({
//   url: uber.defaults.base_url + '/products' + '?' 
//     + qs.stringify({ server_token: uber.defaults.server_token, latitude: 3.1357, longitude: 101.6880 }),
//   json: true
// }, function (err, res, body) {
//   console.log(err);
//   //console.log(res);
//   console.log(body);
// });

//console.log(uber);
// uber.products.list({ latitude: 3.1357, longitude: 101.6880 }, function (err, res) {
//   if (err) console.error(err);
//   console.log(res);
// });

//console.log(uber.estimates);

// uber.estimates.price({ 
//   start_latitude: 3.1357, start_longitude: 101.6880, 
//   end_latitude: 3.0833, end_longitude: 101.6500 }, function (err, res) {
//     if (err) console.error(err);
//     console.log(res);
//   });

// uber.estimates.time({ start_latitude: 3.1357, start_longitude: 101.6880 }, function (err, res) {
//   if (err) console.error(err);
//   console.log(res);
// });

// uber.oauth2.getOAuthAccessToken('', {'grant_type': 'code'},
//   function (e, access_token, refresh_token, results) {
//     console.log(e);
//     console.log(access_token);
//     console.log(refresh_token);
//     console.log(results);
//   });