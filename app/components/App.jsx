import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


export default class App extends React.Component{
	render() {
		return(
			<div>
				<AppBar
				    title={ <Link to="/app">Tuber</Link>}
				    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
				    iconElementRight={
				      <IconMenu
				        iconButtonElement={
				          <IconButton><MoreVertIcon /></IconButton>
				        }
				        targetOrigin={{horizontal: 'right', vertical: 'top'}}
				        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				      >
				        <MenuItem primaryText="Refresh">
					        <Link to="/app/griddle">Dashboard</Link>
				        </MenuItem>
				        <MenuItem primaryText="Help" />
				        <MenuItem primaryText="Sign out" />
				      </IconMenu>
				  	}
  				/>
				{this.props.children}	
			</div>
		)
	}
}
