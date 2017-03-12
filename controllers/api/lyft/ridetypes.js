var Lyft = require('node-lyft');

const config = require('../../../config');

const queryObject = (body) => {
  var qs = {};
  Object.keys(body).forEach((key) => {
    qs[key] = body[key]
  });
  return qs;
};

lyft = new Lyft();

exports.getRideTypes = function (latlong, callback){
  lyft.rideTypes.get(latlong, callback);
};