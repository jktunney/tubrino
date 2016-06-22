import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Hello extends React.Component{
	render() {
		return(
			
			<Card>
			    <CardMedia
			      overlay={<CardTitle title="Welcome to Tuber" subtitle="Empower your community" />}
			    >
			      <img src="http://lorempixel.com/640/480/nature/" />
			    </CardMedia>
			    <CardTitle title="Give your community the freedom of transportation" subtitle="We make it easy to support your community to live happy, free lives" />
			    <CardText>
			      Tuber is an app that gets you places.
			    </CardText>
			</Card>
		)
	}
}
