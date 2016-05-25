import React from 'react';
import Griddle from 'griddle-react';
import RidesStore from '../stores/RidesStore';
import RidesActions from '../actions/RidesActions';
import {first, without, findWhere} from 'underscore';


export default class Rides extends React.Component {

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
			    "Street Address": ride.responses[2].answer,
			    "Street Name": ride.responses[3].answer
			}
		})

		var uberData = {


		}

		return (
		<div>
			<h1>Ride Requests</h1>
			<Griddle results={ridesData} resultsPerPage={10} tableClassName="table" showFilter={true} initialSortAscending={false}
	 		showSettings={true} columns={["Passengers", "Street Address", "Street Name","Zip Code", ]}/>
	 		<h1>Ride Confimations</h1>
	 		<Griddle results={uberData} resultsPerPage={10} tableClassName="table" showFilter={true} initialSortAscending={false}
	 		showSettings={true} columns={["Passengers", "Street Address", "Street Name","Zip Code", ]}/>
	 	</div>
		)
	}
}

