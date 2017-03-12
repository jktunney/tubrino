import React, {PropTypes, Component} from 'react';
import Griddle from 'griddle-react';
import RidesStore from '../stores/RidesStore';
import RidesActions from '../actions/RidesActions';
// import RideTypesStore from '../stores/RideTypesStore';
// import RideTypesActions from '../actions/RideTypesActions';
import {first, without, findWhere} from 'underscore';
import DashboardList from './DashboardList.jsx';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import GoogleMap from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MyGreatPlace from './my_great_place.jsx';
// import RideTypes from './RideTypesComponent.jsx';
// import LocationActions from '../actions/locations/index.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1500,
    height: 650,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export default class Rides extends React.Component {

	static defaultProps = {
	    center: {lat: 39.281578, lng: -76.596563},
	    zoom: 9,
	    greatPlaceCoords: {lat: 39.264412, lng: -76.579939}
	};
	
	shouldComponentUpdate = shouldPureComponentUpdate;
	

	constructor(props){
		super(props);
		this.state = RidesStore.getState();
		// this.state2 = RideTypesStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		RidesStore.listen(this.onChange);
		RidesActions.getRides();
		this.geocoder = new google.maps.Geocoder(); //for geocoder function below
	}

	componentWillUnmount() {
		RidesStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	getMoreRides() {
		RidesActions.getRides(); // for updating for more rides button
	}

	render() {


	   	var ridesData = this.state.rides.map((ride, i) => {

			return {
			    "Passengers": ride.responses[0].answer,
			    "Zip Code": ride.responses[1].answer,
			    "Street Address": ride.responses[2].answer,
			    "Street Name": ride.responses[3].answer,
			    "Wheel Chair": "Yes",
			    "Confirmed": "Yes",
			    "Coords": 1

			    	}
			});



	   	var lyftData = this.state.rides.map((ride,i) => {

	   		return {
	   			"rides": ride.responses[5],
	   			"eta": ride.responses[6],
	   			"cost": ride.responses[7],
	   			"drivers": ride.responses[8]
	   		}

	   	});


	   	var uberData = this.state.rides.map((ride,i) => {

	   		return {
	   			"ride estimate": ride.responses[9]
	   		}

	   	});

		return (
			

			<div style={styles.root}>
			    <GridList
			      cols={2}
			      cellHeight={1000}
			      cellWidth={1200}
			      style={styles.gridList}
			    >

				<GoogleMap
				bootstrapURLKeys={{
	    				key: 'AIzaSyAPn3z-8ixvGSXGPxUVP3anBdH20cr-GCE',
					    language: 'en',
					  }} //geocoder api key
					// apiKey={YOUR_GOOGLE_MAP_API_KEY} 
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}> 
					<MyGreatPlace lat={39.391830} lng={-76.590596} text={'A'} /* Kreyser Avrora */ />
					<MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
				</GoogleMap>


			  		<GridTile>
						<DashboardList />
					</GridTile>
					<GridTile>
						<h1>Ride Requests:</h1> <h2>Call (208) 922-6707 to try it out!</h2>
						<h3>Click the button below and watch your data magically appear :) </h3>
            			<RaisedButton onClick={this.getMoreRides} label="Update your rides" />
						<Griddle results={ridesData} resultsPerPage={4} tableClassName="table" showFilter={true} initialSortAscending={false}
				 		showSettings={true} columns={["Passengers", "Wheel Chair", "Street Address", "Street Name","Zip Code", "Confirmed","Coords"]}/>
		 			</GridTile>

					<GridTile>
						<h1>Lyft Ride Information</h1>
						<Griddle results={lyftData} resultsPerPage={4} tableClassName="table" showFilter={true} initialSortAscending={false}
				 		showSettings={true} columns={["rides","eta","cost","drivers"]}/>
		 			</GridTile>

					<GridTile>
						<h1>Uber Ride Information</h1>
						<Griddle results={uberData} resultsPerPage={4} tableClassName="table" showFilter={true} initialSortAscending={false}
				 		showSettings={true} columns={["ride estimate"]}/>
		 			</GridTile>
		 

		 			<GridTile>
						{/*<DashboardList />*/}
					</GridTile>

		 		</GridList>

		 		
		 	</div>
		)
	}
}