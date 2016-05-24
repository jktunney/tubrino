import alt from '../alt';
import RidesActions from '../actions/RidesActions';

class RidesStore {
	constructor() {
		this.bindActions(RidesActions);
		this.rides = [];
	}

	onGetRidesSuccess(data) {
		/*this.rides = data.slice(0, 1);*/
		this.rides = data.filter((el) => {
			return el.responses.length > 1;
		}).reverse();
	}
}

export default alt.createStore(RidesStore);