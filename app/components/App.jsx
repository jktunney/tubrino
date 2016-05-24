import React from 'react';
import {Link} from 'react-router';
import {Dropdown, Button, Navbar, NavItem} from 'react-materialize';

export default class App extends React.Component{
	render() {
		return(
			<div>
				Navbar
					{this.props.children}	
			</div>
		)
	}
}
