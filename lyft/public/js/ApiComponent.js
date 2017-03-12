/**
 * API Component
 */
window.ApiComponent = (function (window, document, log) {

  /* ========== */
  /* Properties */
  /* ========== */

  /* none at this time */


  /* =================== */
  /* Convenience Methods */
  /* =================== */

  function requestJson(method, url, successCallback, failureCallback) {
    successCallback = successCallback || console.log;
    failureCallback = failureCallback || console.error || console.warn || console.log;
    var xhr = (typeof XDomainRequest !== 'undefined') ?
      (new XDomainRequest()) :
      (new XMLHttpRequest());
    xhr.onreadystatechange = function (event) {
      if (event.target.readyState === 4) {
        /* parse response as JSON */
        var responseJson;
        try {responseJson = window.JSON.parse(event.target.response);}
        catch(exception) {return failureCallback(event.target.response, exception);}
        /* perform callback according to HTTP status code */
        if (xhr.status > 0 && xhr.status < 400) {
          return successCallback(responseJson);
        } else {
          return failureCallback(responseJson);
        }
      }
    };
    xhr.open(method, url, true);
    xhr.send();
  }


  /* =========== */
  /* API Methods */
  /* =========== */

  function getApiStatus(successCallback, failureCallback) {


  function getApiUsers(successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.users.length; i < l; i++) {
        log('hasLyftAuthorizationCode: ' + res.users[i].hasLyftAuthorizationCode);
        log('lyftStatus: ' + res.users[i].lyftStatus);
      }
    };
    return requestJson('GET', '/api/users', successCallback, failureCallback);
  }


  /* ================ */
  /* Lyft API Methods */
  /* ================ */

  function getApiLyftCost(startLatitude, startLongitude, endLatitude, endLongitude, rideType, successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.cost_estimates.length; i < l; i++) {
        //log(res.cost_estimates[i].ride_type + ': $' + parseFloat(res.cost_estimates[i].estimated_cost_cents_min) + ' -- $' + parseFloat(res.cost_estimates[i].estimated_cost_cents_max));
        log(res.cost_estimates[i].ride_type + ': ' + res.cost_estimates[i].primetime_percentage + ' primetime');
      }
    };
    var url = '/api/lyft/cost?start_lat='+startLatitude+'&start_lng='+startLongitude;
    if (endLatitude)  {url += '&end_lat='+endLatitude;}
    if (endLongitude) {url += '&end_lng='+endLongitude;}
    if (rideType)     {url += '&ride_type='+rideType;}
    return requestJson('GET', url, successCallback, failureCallback);
  }

  function getApiLyftDrivers(latitude, longitude, successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.nearby_drivers.length; i < l; i++) {
        log(res.nearby_drivers[i].ride_type + ': ' + res.nearby_drivers[i].drivers.length + ' drivers');
      }
    };
    return requestJson('GET', '/api/lyft/drivers?lat='+latitude+'&lng='+longitude, successCallback, failureCallback);
  }

  function getApiLyftEta(latitude, longitude, successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.eta_estimates.length; i < l; i++) {
        log(res.eta_estimates[i].ride_type + ': ' + res.eta_estimates[i].eta_seconds + ' seconds');
      }
    };
    return requestJson('GET', '/api/lyft/eta?lat='+latitude+'&lng='+longitude, successCallback, failureCallback);
  }

  function getApiLyftProfile(successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      log('id: ' + res.id);
    };
    return requestJson('GET', '/api/lyft/profile', successCallback, failureCallback);
  }

  function getApiLyftRides(successCallback, failureCallback) {
    var start_time = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString();
    var end_time = (new Date()).toISOString();
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.ride_history.length; i < l; i++) {
        log(res.ride_history[i].ride_id + ': ' + res.ride_history[i].status);
      }
    };
    requestJson('GET', '/api/lyft/rides?start_time='+start_time+'&end_time='+end_time, successCallback, failureCallback);
  }

  function getApiLyftRideTypes(latitude, longitude, successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      for (var i = 0, l = res.ride_types.length; i < l; i++) {
        log(res.ride_types[i].ride_type + ': ' + res.ride_types[i].seats + ' seats');
      }
    };
    requestJson('GET', '/api/lyft/ridetypes?lat='+latitude+'&lng='+longitude, successCallback, failureCallback);
  }

  function getApiLyftStatus(successCallback, failureCallback) {
    successCallback = successCallback || function (res) {
      log('remote server status: ' + res.status + ' @ ' + res.meta.timestamp);
    };
    requestJson('GET', '/api/lyft/status', successCallback, failureCallback);
  }

  

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    getApiStatus:        getApiStatus,
    getApiUsers:         getApiUsers,
    getApiLyftCost:      getApiLyftCost,
    getApiLyftDrivers:   getApiLyftDrivers,
    getApiLyftEta:       getApiLyftEta,
    getApiLyftProfile:   getApiLyftProfile,
    getApiLyftRides:     getApiLyftRides,
    getApiLyftRideTypes: getApiLyftRideTypes,
    getApiLyftStatus:    getApiLyftStatus,
  };

})(window, window.document, (window.LogComponent ? window.LogComponent.log : console.log));
