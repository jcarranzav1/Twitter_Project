import axios from 'axios';
import { BASE_URL } from './consts';
import { clearSession, getSession } from './session';
//import { clearSession, getSession } from './session';

const instance = axios.create({
	baseURL: BASE_URL,
});

// con esto eliminamos el headers: {Authorization: `Bearer ${token}`,} de http.post en tweets.
// pórque ahora lo estamos interceptando y agregandolo, antes que se haga el request

instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const token = getSession();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		console.log(error);
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			clearSession();
			document.location = `${BASE_URL}/signin`; //aqui no usamos navigate, porque no estamos en la capa de React, estamos en la capa de red
		}
		return Promise.reject(error);
	}
);
export default instance;
