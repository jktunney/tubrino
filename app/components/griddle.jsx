import React from 'react';
import Griddle from 'griddle-react';
import RidesStore from '../stores/RidesStore';
import RidesActions from '../actions/RidesActions';
import {first, without, findWhere} from 'underscore';
import DashboardList from './DashboardList.jsx';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 450,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

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

  getMoreRides() {
    RidesActions.getRides();
  }

	render() {
    console.log("-----current state------")
    console.log(this.state.rides)
		var ridesData = this.state.rides.map((ride, i) => {
			console.log("RIDE RESPONSES")
			console.log(ride.responses)
			console.log("PASSENGER GUESS")
			console.log(ride.responses[0].answer)
			return {
			    "Passengers": ride.responses[0].answer,
			    "Zip Code": ride.responses[1].answer,
			    "Street Address": ride.responses[2].answer,
			    "Street Name": ride.responses[3].answer,
			    "Wheel Chair": "Yes",
			    "Confirmed": "Yes"
			}
		});

		return (
			<div style={styles.root}>
			    <GridList
			      cols={2}
			      cellHeight={500}
			      cellWidth={1000}
			      style={styles.gridList}
			    >
			  		<GridTile>
						<DashboardList />
					</GridTile>
					<GridTile>
						<h1>Ride Requests</h1>
            <RaisedButton onClick={this.getMoreRides} label="Update your rides" />
						<Griddle results={ridesData} resultsPerPage={4} tableClassName="table" showFilter={true} initialSortAscending={false}
				 		showSettings={true} columns={["Passengers", "Wheel Chair", "Street Address", "Street Name","Zip Code", "Confirmed"]}/>
		 			</GridTile>
		 			<GridTile>
						{/*<DashboardList />*/}
					</GridTile>
			 		{/*<GridTile>
				 		<h1>Ride Confirmations</h1>
						<Griddle results={fakeData} resultsPerPage={10} tableClassName="table" showFilter={true} initialSortAscending={false}
				 		showSettings={true} columns={["Confirmed", "Destination", "Arrived"]}/>
			 		</GridTile>*/}
		 		</GridList>
		 	</div>
		)
	}
}

