import React from 'react';
import ReactDOM from 'react-dom';
import Griddle from 'griddle-react';
import RidesStore from '../stores/RidesStore';
import RidesActions from '../actions/RidesActions';
import {first, without, findWhere} from 'underscore';


class Rides extends React.Component {

	constructor(props){
		super(props);
		this.state = RidesStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		RidesStore.listen(this.onChange);
		RidesActions.getRides();
	}

	componentWillUnmount() {
		RidesStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		var ridesData = this.state.rides.map((ride, i) => {
			console.log("RIDE RESPONSES")
			console.log(ride.responses)
			console.log("PASSENGER GUESS")
			console.log(ride.responses[0].answer)
			return {
			    "Passengers": ride.responses[0].answer,
			    "Zip Code": ride.responses[1].answer,
			    "Street Address": ride.responses[2].answer

			}
		})

		return (
		<Griddle results={ridesData} tableClassName="table" showFilter={true}
 		showSettings={true} columns={["Passengers", "Zip Code", "Street Address"]}/>
		)
	}
}


ReactDOM.render(<Rides />, document.getElementById('griddle'));
