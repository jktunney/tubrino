window.newcomp = (function (window, document, log) {


	// //copied in requestJson to edit to parse text into Json
	// function requesttheJson(successCallback, failureCallback) {
	//     successCallback = successCallback || console.log;
	//     failureCallback = failureCallback || console.error || console.warn || console.log;
	//     var xhr = (typeof XDomainRequest !== 'undefined') ?
	//       (new XDomainRequest()) :
	//       (new XMLHttpRequest());
	//     xhr.onreadystatechange = function (event) {
	//       if (event.target.readyState === 4) {
	//          parse response as JSON 
	//         var responseJson;
	//         try {responseJson = window.JSON.parse(event.target.response);}
	//         catch(exception) {return failureCallback(event.target.response, exception);}
	//         /* perform callback according to HTTP status code */
	//         if (xhr.status > 0 && xhr.status < 400) {
	//           return successCallback(responseJson);
	//         } else {
	//           return failureCallback(responseJson);
	//         }
	//       }
	//     };
	//     xhr.open(true);
	//     xhr.send();
	//   }

	function twilcords(successCal) {
		successCal = log("here are the coordinates from twilio:  ");
	};

	return{
		twilcords: twilcords
	};

})(window,window.document, (window.LogComponent ? window.LogComponent.log : console.log));