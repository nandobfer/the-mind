import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';

const SignInRoutes: React.FC = () => {
	return (
		<Switch>
			<Route exact path="/"><Dashboard/></Route>
		</Switch>
	);
};

export default SignInRoutes;