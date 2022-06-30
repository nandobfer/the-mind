import React, { createContext, useEffect, useState } from 'react';

import { lstoragePrefix } from '../App';

interface AuthUserInput {
	username: string;
	password: string;
}

interface IAuthUserResponse {
	user: {
		username: string;
	};
	accessToken: string;
}

interface IAuthContextData {
	signed: boolean;
	token: string;
	username: string;
	error: string;
	loading: boolean;
	Login(input: AuthUserInput): Promise<void>;
	SignUp(input: AuthUserInput): Promise<void>;
	Logout(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [token, setToken] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	/**
	 * Updates all states, storages and cache related to the
	 * athenticated user after login/signup
	 */
	function updateAuthUser({ accessToken, user }: IAuthUserResponse) {
		if (accessToken && !!user.username) {
			setToken(accessToken);
			setUsername(user.username);

			localStorage.setItem(`${lstoragePrefix}:token`, accessToken);
			localStorage.setItem(`${lstoragePrefix}:username`, user.username);
		}
	}

	/**
	 * Requests user authentication with username and password
	 * Set the context to logged in after conclusion
	 */
	async function Login({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);
	}

	/**
	 * Requests user registration with username and password
	 * Set the context to logged in after conclusion
	 */
	async function SignUp({ username, password }: AuthUserInput): Promise<void> {
		if (loading) return;

		setLoading(true);
	}

	/**
	 * Clear all authenticated user data
	 */
	function Logout(): void {
		setToken("");
		localStorage.removeItem(`${lstoragePrefix}:token`);
		localStorage.removeItem(`${lstoragePrefix}:username`);
	}

	/**
	 * Looks for saved data in the local storage after page load
	 */
	useEffect(() => {
		const storagedToken = localStorage.getItem(`${lstoragePrefix}:token`);
		const storagedUsername = localStorage.getItem(`${lstoragePrefix}:username`);
		if (storagedToken && storagedUsername) {
			setToken(storagedToken);
			setUsername(storagedUsername);
		}
	}, []);


	return (
		<AuthContext.Provider value={{ signed: !!token, username, token, Login, Logout, SignUp, error, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;