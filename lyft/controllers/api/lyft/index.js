/* dependencies */
var request = require('request');

/* global configuration */
var config = require('../../../config/config');


/* ============== */
/* Helper Methods */
/* ============== */

var requestWithBearerToken = function (res, options, callback) {
  /* begin: pre-auth request */
  request({
    method: 'POST',
    uri: config.LYFT_API_URI + '/oauth/token',
    auth: {
      username: config.LYFT_CLIENT_ID,
      password: (config.USE_SANDBOX ? 'SANDBOX-' : '') + config.LYFT_CLIENT_SECRET
    },
    json: {
      grant_type: 'client_credentials',
      scope: 'offline public profile rides.read rides.request'
    }
  }, function (preAuthError, preAuthResponse, preAuthBody) {
    if (preAuthError) {
      res
        .status(preAuthResponse.statusCode)
        .json({meta: {success: false, error: preAuthError}});
    } else {
      /* begin: post-auth request */
      options = options || {};
      options.auth = options.auth || {bearer: preAuthBody.access_token};
      callback = callback || function (postAuthError, postAuthResponse, postAuthBody) {
        if (postAuthError) {
          res
            .status(postAuthResponse.statusCode)
            .json({meta: {success: false, error: postAuthError}});
        } else {
          postAuthBody = postAuthBody || {};
          postAuthBody.meta = {success: true};
          res
            .status(postAuthResponse.statusCode)
            .json(postAuthBody);
        }
      };
      request(options, callback);
      /* end: post-auth request */
    }
  });
  /* end: pre-auth request */
};


/* ============== */
/* Route Handlers */
/* ============== */

exports.getDrivers = function (req, res, next) {
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/drivers',
    json: true,
    qs: {lat: req.query.lat, lng: req.query.lng}
  });
};

exports.getCost = function (req, res, next) {
  var queryParameters = {start_lat: req.query.start_lat, start_lng: req.query.start_lng};
  if (typeof req.query.end_lat !== 'undefined') {queryParameters.end_lat = req.query.end_lat;}
  if (typeof req.query.end_lng !== 'undefined') {queryParameters.end_lng = req.query.end_lng;}
  if (typeof req.query.ride_type !== 'undefined') {queryParameters.ride_type = req.query.ride_type;}
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/cost',
    json: true,
    qs: queryParameters
  });
};

exports.getEta = function (req, res, next) {
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/eta',
    json: true,
    qs: {lat: req.query.lat, lng: req.query.lng}
  });
};

exports.getProfile = function (req, res, next) {
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/profile',
    json: true
  });
};

exports.getRides = function (req, res, next) {
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/rides',
    json: true,
    qs: {start_time: req.query.start_time, end_time: req.query.end_time}
  });
};

exports.getRideTypes = function (req, res, next) {
  requestWithBearerToken(res, {
    method: 'GET',
    uri: config.LYFT_API_URI + '/v1/ridetypes',
    json: true,
    qs: {lat: req.query.lat, lng: req.query.lng}
  });
};

exports.getStatus = function (req, res, next) {
  request.get(config.LYFT_API_URI + '/v1', function (error, response, body) {
    if (error) {
      res
        .status(400)
        .json({meta: {success: false, error: error}, status: 'unhappy'});
    } else {
      var timestamp = response.headers['date'] ? (new Date(response.headers['date'])).getTime() : '';
      res
        .status(200)
        .json({meta: {success: true, timestamp: timestamp}, status: 'happy'});
    }
  });
};
