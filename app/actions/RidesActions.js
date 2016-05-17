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
	  fetch('http://localhost:3000/api/rides')
	  	.then(response => response.json())
	    .then((data) => {
	    	console.log(data.results)
	      this.getRidesSuccess(data.results);
	    });
	}
}

export default alt.createActions(RidesActions);