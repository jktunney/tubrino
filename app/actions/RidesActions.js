import alt from '../alt';

class RidesActions {
	constructor() {
		this.generateActions(
			'getRides',
			'getRidesSuccess'
		);
	}

	getRides() {
	  request
	    .get('/api/rides')
	    .end((err, res) => {
	      this.actions.getRidesSuccess(res.body);
	    });
	}
}

export default alt.createActions(RidesActions);