import React from 'react';
import {Link} from 'react-router';

export default class Hello extends React.Component{
	render() {
		return(
			<div>
				<h2>Ride Requests</h2>
				<Link to="/griddle">Griddle</Link>
			</div>
		)
	}
}
