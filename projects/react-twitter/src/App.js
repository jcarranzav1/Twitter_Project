import React, { useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';

import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/auth/SignIn'));

const init = () => {
	return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

function App() {
	const [user, setUser] = useReducer(authReducer, {}, init);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Navigation />
			<Routes>
				<Route
					path="/"
					element={
						<React.Suspense
							fallback={<Spinner animation="border" />}>
							<Home />
						</React.Suspense>
					}
				/>
				<Route
					path="/signin"
					element={
						<React.Suspense
							fallback={<Spinner animation="border" />}>
							<SignIn />
						</React.Suspense>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthContext.Provider>
	);
}

export default App;
