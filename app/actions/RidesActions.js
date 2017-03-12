import fetch from 'isomorphic-fetch';
import alt from '../alt';

class RidesActions {
	constructor() {
		this.generateActions(
			'getRidesSuccess'
		);
	}
	getRides() {
		console.log('getRides')
	  fetch(global.apiBaseUrl + '/api/rides')
	  	.then(response => response.json())
	    .then((data) => {
	    	console.log(data.results)
	      this.getRidesSuccess(data.results);
	    });
	}

	// getCoords(){
	// 		console.log('getCoords')
	// 	fetch()
	// }
}

export default alt.createActions(RidesActions);