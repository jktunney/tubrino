import alt from '../alt';
import RidesActions from '../actions/RidesActions';

class RidesStore {
	constructor() {
		this.bindActions(RidesActions);
		this.rides = [];
	}

	onGetRidesSuccess(data) {
		this.rides = data;
	}
}

export default alt.createStore(RidesStore);