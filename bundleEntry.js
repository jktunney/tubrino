import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app/components/App.jsx';
import Hello from './app/components/hello.jsx';
import Griddle from './app/components/griddle.jsx';
import DashboardList from './app/components/DashboardList.jsx';

global.apiBaseUrl = '';

if (window.location.host === 'localhost:8080') {
  global.apiBaseUrl = 'http://localhost:3000'
}
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Hello} />
		<Route path="griddle" component={Griddle} />
	</Route>
);

const Application = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router
		history={browserHistory}
		routes={routes}
	/>
  </MuiThemeProvider>
);

ReactDOM.render((
	<Application />
), document.getElementById('react-root'));