const config = require('../../../config');

const queryObject = (body) => {
  var qs = {};
  Object.keys(body).forEach((key) => {
    qs[key] = body[key]
  });
  return qs;
};

module.exports = {
  getRideTypes(req, res, next) {
    var qs = queryObject(req.body);
    lyft.rideTypes.get(qs).then((data) => {
      res.json(data);
      next();
    }).catch((err) => {
      res.json(err);
      next();
    });
  },
  getCost(req, res, next) {
    var qs = queryObject(req.body);
    lyft.cost.get(qs).then((data) => {
      res.json(data);
      next();
    }).catch((err) => {
      res.json(err);
      next();
    });;
  },
  getNearbyDrivers(req, res, next) {
    var qs = queryObject(req.body);
    lyft.nearbyDrivers.get(qs).then((data) => {
      res.json(data);
      next();
    }).catch((err) => {
      res.json(err);
      next();
    });;
  },
  getETA(req, res, next) {
    var qs = queryObject(req.body);
    lyft.eta.get(qs).then((data) => {
      res.json(data);
      next();
    }).catch((err) => {
      res.json(err);
      next();
    });;
  },
};