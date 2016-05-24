import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Hello from './app/components/hello.jsx';
import Griddle from './app/components/griddle.jsx';

const routes = (
	<Route path="/">
		<IndexRoute component={Hello} />
		<Route path="griddle" component={Griddle} />
	</Route>
);

ReactDOM.render((
	<Router
		history={browserHistory}
		routes={routes}
	/>
), document.getElementById('react-root'));