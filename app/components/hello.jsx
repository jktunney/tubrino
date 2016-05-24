import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Hello extends React.Component{
	render() {
		return(
			
			<Card>
			    <CardMedia
			      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
			    >
			      <img src="http://lorempixel.com/600/337/nature/" />
			    </CardMedia>
			    <CardTitle title="Tuber" subtitle="Get there easy" />
			    <CardText>
			      Tuber is an app that gets you places.
			    </CardText>
			    <CardActions>
			      <FlatButton label="Action1" />
			      <FlatButton label="Action2" />
			    </CardActions>
			</Card>
		)
	}
}
