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
		var fakeData =  [
			{
			    "id": 0,
			    "name": "Mayer Leonard",
			    "city": "Kapowsin",
			    "state": "Hawaii",
			    "country": "United Kingdom",
			    "company": "Ovolo",
			    "favoriteNumber": 7
			}
		]

		return (
		<Griddle results={fakeData} tableClassName="table" showFilter={true}
 		showSettings={true} columns={["name", "city", "state", "country"]}/>
		)
	}
}


ReactDOM.render(<Rides />, document.getElementById('griddle'));
