import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';

const DashboardRoutes: React.FC = () => {
	return (
		<Switch>
			<Route exact path="/"><Dashboard/></Route>
		</Switch>
	);
};

export default DashboardRoutes;