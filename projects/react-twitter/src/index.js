import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store/Store';

ReactDOM.render(
	<BrowserRouter>
		<StoreProvider>
			<App />
		</StoreProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
