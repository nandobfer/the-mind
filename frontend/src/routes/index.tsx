import React, { useContext } from 'react';

import SignInRoutes from './SignInRoutes';
import DashboardRoutes from './DashboardRoutes';
import AuthContext from '../contexts/auth';

const Routes: React.FC = () => {
	const { signed } = useContext(AuthContext);

	return signed ? <DashboardRoutes /> : <SignInRoutes />;
};

export default Routes;