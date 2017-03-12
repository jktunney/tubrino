var Uber = require('node-uber');
var express = require('express');
var app = express();

var options = {
    client_id: '',
    client_secret: '',
    server_token: '',
    name: 'tubrino',
    redirect_uri: 'http://localhost:3000/callback'
};

var uber = new Uber(options);

app.get('/', function (req, res) {
// Kick off the authentication process
    var scope = ['request'];
    res.redirect(uber.getAuthorizeUrl(scope, 'http://localhost:3000/callback'));
});
          
app.get('/callback', function (req, res) {
    uber.authorization ({grantType: 'authorization_code', authorization_code: req.query.code}, function (err, access_token) {
    uber.access_token = access_token;
    res.send('Got an access token! Head to /book to initiate an ride request.');
    });
});

exports.getEstimate = function (latlng, callback) {
    uber.estimates.time(latlng, callback);
};
