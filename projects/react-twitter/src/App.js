import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';

const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/auth/SignIn'));

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
