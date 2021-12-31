import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';

import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/auth/SignIn'));

function App() {
	const [user, setUser] = useReducer(authReducer, {});

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
