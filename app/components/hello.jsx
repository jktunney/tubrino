import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component{
	render() {
		return(
			<h2>Hello World</h2>
		)
	}
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));